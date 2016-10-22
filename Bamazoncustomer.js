// necessary npm packages

var inquirer = require('inquirer'),
    prompt = require('prompt'),
    mysql = require('mysql');

var userIdPick;
var userPurchaseAmount;
var checkStock;
var updatedStockQuantity;


var connection = mysql.createConnection({ //create connection with mysql
    host: 'locahost',
    port: 3306,
    user: 'root',
    password: 'sprinkle1',
    database: 'Bamazon'
});

connection.connect(function(err) { // function to connect with the database
    if (err) { // test to see if connection working
        console.log(err); //console log if there is an error
    }
});

function startApp() {
    console.reset = function() { // this will clear the console
        return process.stdout.write('\033c');

    };
    console.reset();

    console.log('~ Welcome to BAMAZON! ~'); // welcomes the user

    inquirer.prompt({
        name: "welcome",
        type: "list",
        message: "Would you like to browse our inventory today?",
        choices: ['yes', 'no']
    }).then(function(answer) {
        if (answer.welcome === 'yes') {
            displayItemsForSale();
        } else {
            console.log("See you next time!"); // if customer says no
        }
    });

}
startApp();

// function to display all items that are in the database
function displayItemsForSale() {
    // clear the console
    console.reset = function() {
        return process.stdout.write('\033c');
    };
    console.reset();
    console.log("THANK YOU FOR SHOPPING WITH US TODAY");

    connection.query('SELECT * FROM bamazonDB.products', function(err, result) {
        if (err) {
            console.log(err);
        }
        console.log("ITEMS AVAILABLE FOR PURCHASE");
        for (var i = 0; i < result.length; i++) {
            console.log("ID: " + result[i].id + "\nProduct Name: " + result[i].productName + "\nPrice: " + result[i].price);
            console.log("--------------------------------------");
        }
        buySomething();
       
    });
}

// function for the user to buy something
var buySomething = function() {
    inquirer.prompt([{
        name: "id",
        type: "input",
        message: "Enter the ID for the item you'd like to purchase: "
    }, {
        name: "amount",
        type: "input",
        message: "How many would you like to purchase? "
    }]).then(function(answer) {

        // assign the user id input to userIdPick
        userIdPick = answer.id;
        
        console.log("User ID Input: " + answer.id);
        // assign the user amount input to userPurchaseAmount
        userPurchaseAmount = answer.amount;
      
        console.log("User Amount Input: " + answer.amount);


        // create a query to grab all the date for the id the user entered
        connection.query('SELECT * FROM bamazonDB.products WHERE ?', { id: answer.id }, function(err, res) {
            if (err) {
                console.log(err);
            }
            // check the stockQuantity in the database and assign to checkStock
            checkStock = res[0].stockQuantity;

            // subtract the userPurchaseAmount from the checkStock, and assign it to updatedStockQuantity
            // updatedStockQuantity will be used to update the stockQuantity in the database
            updatedStockQuantity = checkStock - userPurchaseAmount;
            // 
            console.log("Current Stock Amount: " + checkStock);
            
            console.log("Updated Stock Amount: " + updatedStockQuantity);

            if (checkStock > 0) {
               
                console.log("Thank you for your purchase of: " + answer.amount + " " + res[0].productName + "!");
                // create a query to update the stockQuantity
                connection.query('UPDATE bamazonDB.products SET stockQuantity=? WHERE id=?', [updatedStockQuantity, userIdPick], function(err, res) {
                    if (err) {
                        console.log(err);
                    }
                });

            } else {
                console.log("Sorry that item is no longer in stock!");

            }
        });
    });
};
