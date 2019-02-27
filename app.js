const fs = require('fs');
const yargs = require('yargs');

const categories = require('./categories.js');
const log = require('./log.js');

const categoryOptions = {
	describe: 'puchase category',
	demand: true,
	alias: 'c'
};

const priceOptions = {
	describe: 'purchase amount',
	demand: true,
	alias: 'p'
};

const categoryNameOptions = {
	describe: 'name of category',
	demand: true,
	alias: 'n'
};

const argv = yargs
	.command('add', 'add a new purchase to the log', {
		category: categoryOptions,
		price: priceOptions,
		description: {
			describe: 'purchase description',
			alias: 'd'
		}
	})
	.command('list', 'list all purchases in the purchase log')
	.command('remove', 'remove a purchase from the log', {
		id: {
			describe: 'purchase id',
			demand: true
		}
	})
	.command('add-cat', 'add a category', {
		name: categoryNameOptions
	})
	.command('list-cat', 'list all categories')
	.command('remove-cat', 'remove a category', {
		name: categoryNameOptions
	})
	.command('reset-cat', 'reset categories')
	.command('total', 'display total amount spent per category')
	.command('remove-all', 'remove all purchases from the log')
	.command('currency', 'change the currency')
	.help()
	.argv;

let command = argv._[0];

if (command === 'add') {
	let validCategory = categories.categoryExists(argv.category);

	if (!validCategory) {
		console.log("Invalid category name. Use 'list-cat' to see the list of available");
		console.log("categories, or use 'add-cat' to add a new one.");
	} else {
		let purchase = log.addPurchase(argv.category, argv.price, argv.description);

		if (purchase) {
			console.log('Purchase added successfully.');
			log.displayPurchase(purchase);
		} else {
			console.log("Invalid price. Price must be a positive numerical value.");
		}
	}
} else if (command === 'list') {
	log.displayPurchaseLog();
} else if (command === 'remove') {
	let removed = log.removePurchase(argv.id);

	if (removed) {
		console.log('Purchase removed successfully.');
	} else {
		console.log("Invalid ID number. Use the 'list' command to see a list of all purchases");
		console.log("and their corresponding ID's.");
	}
} else if (command === 'add-cat') {
	let existingCategory = categories.categoryExists(argv.name);

	if (existingCategory) {
		console.log("This category already exists.");
	} else {
		categories.addCategory(argv.name);
		console.log("Category added successfully. Use 'list-cat' to see the list of categories.");
	}
} else if (command === 'list-cat') {
	categories.displayAll();
} else if (command === 'remove-cat') {
	let existingCategory = categories.categoryExists(argv.name);
	if (existingCategory) {
		categories.removeCategory(argv.name);
		console.log("Category removed successfully.");
	} else {
		console.log("This category does not exist.");
	}
} else if (command === 'reset-cat') {
	categories.resetCategories();
	console.log("The category list has been reset to the default list.");
} else if (command === 'total') {
	log.displayTotals();
} else if (command === 'remove-all') {
	log.removeAll();
	console.log("All purchases were removed from the log.");
} else {
	console.log("Unrecognized command. Use '--help' to see the list of available commands.");
}