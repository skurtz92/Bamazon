// necessary npm packages

var inquirer = require('inquirer'),
	prompt = require('prompt'),
	mysql = require('mysql');

	var connection = mysql.createConnection({ //create connection with mysql
	host: 'locahost',
	port: 3306,
	user: 'root',
	password: 'sprinkle1',
	database: 'Bamazon'
	});

connection.connect(function(err){ // function to connect with the database
	if (err) {						// test to see if connection working
		console.log(err);		//console log if there is an error
	}
});

function startApp() {
	console.reset = function () { // this will clear the console
		return process.stdout.write('\033c');

	};
	console.reset();

	console.log('~ Welcome to BAMAZON! ~'); // welcomes the user

	inquirer.prompt({
		name: "welcome",
		type: "list",
		message: "Would you like to browse our inventory today?",
		choices: ['yes', 'no']
	}).then(function(answer){
		if (answer.welcome === 'yes') {
			displayItemsForSale();
		}
		else {
			console.log("See you next time!"); // if customer says no
		}
	});

}
startApp();