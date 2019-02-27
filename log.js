const fs = require('fs');

const categories = require('./categories.js');
const currencyFormatter = require('./currency-format.js');

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
	if (typeof price === 'number' && price > 0 && (price * 100) % 1 === 0) {
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
	console.log(`Category: ${purchase.category}`);
	process.stdout.write(`Price: `);
	currencyFormatter.output(purchase.price);
	if (purchase.description) {
		console.log(`Description: ${purchase.description}`);
	} else {
		console.log();
	}
};


/**
* displayPurchaseLog(): outputs all the logged purchases
*/
let displayPurchaseLog = () => {
	let log = fetchLog();

	console.log("\nPURCHASE LOG");
	console.log("============\n");
	for (let i = 1; i <= log.length; i++) {
		//console.log('\n');
		console.log("Purchase ID: " + i);
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
	let categoryList = categories.fetchCategories();
	let totalExpenses = 0;

	console.log("\nTotal Expenses");
	console.log("==============");
	for (category of categoryList) {
		let purchaseList = log.filter((purchase) => purchase.category.toUpperCase() === category.toUpperCase());
		if (purchaseList.length > 0) {
			let sum = calculateSum(purchaseList);
			process.stdout.write(`${category}: `);
			currencyFormatter.output(purchase.price);
			totalExpenses += sum;
		}
	}
	console.log('---');
	process.stdout.write('Total: ');
	currencyFormatter.output(totalExpenses);
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