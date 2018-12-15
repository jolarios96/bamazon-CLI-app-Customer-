// Initialize Packages
var mysql = require('mysql');
var inquirer = require('inquirer');

// Main App Driver
//===================================================================================
// MySQL Connection
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Jbl.92196",
    database: "bamazon"
});

//  Execute code on connection
connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
    }
    loadProducts();
});


// FUNCTIONS
//===================================================================================
// load products from table
function loadProducts() {
    // Selects all from 'products' in table
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;

        // Prompts user for a product ID
        promptForItem(res);
    });
};

// Prompts user for a product ID
function promptForItem(items) {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Input the ID of the product to buy.',
            name: 'choice',
        }
    ]).then(function (val) {
        var choiceID = parseInt(val.choice);
        var product = checkInventory(choiceID, items);

        // If product exists
        if (product) {
            // Prompt for quantity
            promptQuantity(product);
        } else {
            console.log('\nThat item is out of stock!');
            loadProducts();
        };
    });
};

function promptQuantity(product) {
    inquirer.prompt([
        {
            type: "input",
            name: "quantity",
            message: "How many would you like?",
            validate: function (val) {
                return val > 0
            }
        }
    ]).then(function (val) {
        var quantity = parseInt(val.quantity);

        // If supply < user query
        if (quantity > product.stock_quantity) {
            console.log("\nInsufficient quantity!");
            loadProducts();
        } else {
            // Finish the purchase, update table
            finalize(product, quantity)
        };
    });
};

// check Inventory for product
function checkInventory(choiceID, inventory) {
    for (var i = 0; i < inventory.length; i++) {
        if (inventory[i].item_id === choiceID) {

            // If product exists, return the product
            return inventory[i];
        };
    };

    return null;
};

function finalize(product, quantity) {
    connection.query(
        "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
        [quantity, product.item_id],
        function (err, res) {
            // Inform of success, show info, re-run program
            console.log("\nSuccessfully purchased " + quantity + " " + product.product_name + "'s!");
            loadProducts();
        }
    );
};
