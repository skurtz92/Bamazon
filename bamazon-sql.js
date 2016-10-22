#CREATE DATABASE Bamazon;

CREATE TABLE Bamazon.Products (
    ItemID INTEGER(10) AUTO_INCREMENT NOT NULL,
    ProductName VARCHAR(100),
    DepartmentName VARCHAR(100),
    Price DECIMAL(5,3),
    StockQuantity INTEGER(10),
    PRIMARY KEY (ItemID));
    
INSERT INTO Bamazon.Products (ProductName, DepartmentName, Price, StockQuantity)
VALUES ("Toothpaste", "Walmart", 1.50, 4), 
			("Shampoo", "Target", 6.50, 5),
            ("Cheese", "Grocery", 1.50, 6),
            ("Carrots", "Grocery", 4.00, 9),
            ("Nike", "Sporting goods", 49.99, 4),
            ("Tshirt", "Clothes", 10.00, 7),
            ("Earrings", "Accessories", 9.99, 5),
            ("Basketball", "Equipment", 4.99, 7),
            ("Tennis racket", "Sports", 9.99, 2),
            ("Wireless Keyboard", "Computers", 3.99, 1);
            SELECT * FROM Bamazon.Products;