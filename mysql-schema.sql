DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
("The Avengers", "Movies", 18.99, 128),
("Transformers: The Last Knight", "Movies", 13.00, 100),
("Thor Ragnarok", "Movies", 30.00, 50),
("The Avengers: Infinity War", "Movies", 22.00, 20),
("Spiderman: Homecoming", "Movies", 20.00, 35),
("Popcorn (Large)", "Foods/Drinks", 10.00, 74),
("Popcorn (Medium)", "Foods/Drinks", 8.00, 90),
("Popcorn (Small)", "Foods/Drinks", 5.00, 60),
("Coffee", "Foods/Drinks", 5.00, 999);


SELECT * FROM products;
