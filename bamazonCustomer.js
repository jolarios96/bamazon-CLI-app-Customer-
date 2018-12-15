// Initialize Packages
var mysql = require('mysql');
var inquirer = require('inquirer');

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
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'choice',
                message: 'Input the ID of the product to buy.',
            }
        ])
        .then(function (val) {
            var choiceID = parseInt(val.choice);
            var product = checkInventory(choiceID, items);

            // If product exists
            if (product) {
                // Prompt for quantity
                promptQuantity(product);
            }
            else {
                console.log('\nThat item is out of stock!');
                loadProducts();
            }
        });
}

function promptQuantity() {
    // Prompt for amount
}