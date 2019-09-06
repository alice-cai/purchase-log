const fs = require('fs');
const chalk = require('chalk');

const categories = require('./categories.js');
const currency = require('./currency.js');

const LOG_FILE = 'data/log-data.json';


/**
* fetchLog(): reads the log from the file and returns it
*/
let fetchLog = () => {
	try {
		let logString = fs.readFileSync(LOG_FILE);
		return JSON.parse(logString);
	} catch (e) {
		return [];
	}
};


/**
* saveLog(log): saves the log to the file
*/
let saveLog = (log) => {
	fs.writeFileSync(LOG_FILE, JSON.stringify(log));
};


/**
* addPurchase(category, price, description): creates a purchase structure with the attributes
*   specified by the arguments and saves it to the log
*/
let addPurchase = (category, price, description) => {
	if (typeof price === 'number' && price > 0 /*&& (price * 100) % 1 === 0*/) {
		let log = fetchLog();

		let newPurchase = {
			category,
			price,
			description
		};

		log.push(newPurchase);
		saveLog(log);

		return newPurchase;
	}
};


/**
* displayPurchase(purchase): outputs the argument purchase
*/
let displayPurchase = (purchase) => {
	console.log(chalk.bold("Category: ") + `${purchase.category}`);
	process.stdout.write(chalk.bold(`Price: `));
	currency.format(purchase.price);
	if (purchase.description) {
		console.log(chalk.bold("Description: ") + `${purchase.description}`);
	}
	console.log();
};


/**
* displayPurchaseLog(): outputs all the logged purchases
*/
let displayPurchaseLog = () => {
	let log = fetchLog();

	console.log(chalk.bold("\n------ PURCHASE LOG ------\n"));
	for (let i = 1; i <= log.length; i++) {
		console.log(chalk.bold("Purchase ID: ") + i);
		displayPurchase(log[i - 1]);

		if (i !== log.length) {
			console.log('---\n');
		}
	}
};


/**
* removePurchase(id): removes the purchase with the specified id from the log (if it exists)
*/
let removePurchase = (id) => {
	let log = fetchLog();
	let removedItems = log.splice(id-1, 1);

	if (removedItems.length !== 0) {
		saveLog(log);
		return true;
	}
};


/**
* calculateSum(purchaseList): returns the total amount spent on the purchases in purchaseList
*/
let calculateSum = (purchaseList) => {
	let sum = 0;

	for (purchase of purchaseList) {
		sum += purchase.price;
	}

	return sum;
};


/**
* displayTotals(): outputs the amount of money spent per category and in total
*/
let displayTotals = () => {
	let log = fetchLog();
	let categoryList = categories.getCategories();
	let totalExpenses = 0;

	let longestCategory = categoryList.reduce((c1, c2) => c1.length >= c2.length ? c1 : c2);
	let categoryPadding = longestCategory.length + 7;

	console.log(chalk.bold("\n------ Total Expenses ------\n"));
	for (category of categoryList) {
		let purchaseList = log.filter((purchase) => purchase.category.toUpperCase() === category.toUpperCase());
		if (purchaseList.length > 0) {
			let sum = calculateSum(purchaseList);
			process.stdout.write(`${category.padEnd(categoryPadding)}`);
			currency.format(sum);
			totalExpenses += sum;
		}
	}
	console.log("---");
	process.stdout.write('Total'.padEnd(categoryPadding));
	currency.format(totalExpenses);
	console.log();
};


/**
* removeAll(): erases all log data
*/
let removeAll = () => {
	saveLog([]);
};

module.exports = {
	addPurchase,
	displayPurchase,
	displayPurchaseLog,
	removePurchase,
	displayTotals,
	removeAll
};