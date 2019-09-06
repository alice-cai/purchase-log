const fs = require('fs');
const yargs = require('yargs');
const chalk = require('chalk');

const categories = require('./categories.js');
const log = require('./log.js');
const currency = require('./currency.js');
const util = require('./util.js');

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
	.command('remove-all', 'remove all purchases from the log')
	.command('add-cat', 'add a category', {
		name: categoryNameOptions
	})
	.command('list-cat', 'list all categories')
	.command('remove-cat', 'remove a category', {
		name: categoryNameOptions
	})
	//.command('reset-cat', 'reset categories') // for testing
	.command('total', 'display total amount spent per category')
	.command('currency', 'display the current currency')
	.command('list-currency', 'display the list of currencies')
	.command('set-currency', 'set the currency', {
		currency: {
			describe: 'currency code (e.g. CAD for Canadian Dollars)',
			demand: true,
			alias: 'c'
		}
	})
	.help()
	.argv;

let command = argv._[0];

if (command === 'add') {
	let validCategory = categories.categoryExists(argv.category);

	if (!validCategory) {
		console.log(chalk.red("Invalid category name. Use 'list-cat' to see the list of available"));
		console.log(chalk.red("categories, or use 'add-cat' to add a new one."));
	} else {
		let purchase = log.addPurchase(argv.category, argv.price, argv.description);

		if (purchase) {
			console.log(chalk.green('Purchase added successfully.'));
			log.displayPurchase(purchase);
		} else {
			console.log(chalk.red("Invalid price. Price must be a positive numerical value."));
		}
	}
} else if (command === 'list') {
	log.displayPurchaseLog();
} else if (command === 'remove') {
	let removed = log.removePurchase(argv.id);

	if (removed) {
		console.log(chalk.green('Purchase removed successfully.'));
	} else {
		console.log(chalk.red("Invalid ID number. Use the 'list' command to see a list of all purchases"));
		console.log(chalk.red("and their corresponding IDs."));
	}
} else if (command === 'remove-all') {
	log.removeAll();
	console.log(chalk.green("All purchases were removed from the log."));
} else if (command === 'add-cat') {
	let existingCategory = categories.categoryExists(argv.name);

	if (existingCategory) {
		console.log(chalk.red("This category already exists."));
	} else {
		categories.addCategory(argv.name);
		console.log(chalk.green("Category added successfully. Use 'list-cat' to see the list of categories."));
	}
} else if (command === 'list-cat') {
	categories.displayAll();
} else if (command === 'remove-cat') {
	let existingCategory = categories.categoryExists(argv.name);
	if (existingCategory) {
		util.requestConfirmation("Removing this category will remove all purchases associated with it.")
			.then(didConfirm => {
				if (didConfirm) {
					log.removeCategoryLogs(argv.name);
					categories.removeCategory(argv.name);
					console.log(chalk.green(`Category "${argv.name}" removed successfully.`));
				} else {
					console.log("Category removal aborted.");
				}
			})
			.catch(error => {
				// This should theoretically never run.
				console.log(chalk.red("An unexpected error occured."));
			});
	} else {
		console.log(chalk.red("This category does not exist."));
	}
// } else if (command === 'reset-cat') {
// 	categories.resetCategories();
// 	console.log(chalk.green("The category list has been reset to the default list."));
} else if (command === 'total') {
	log.displayTotals();
} else if (command === 'currency') {
	currency.displayCurrentCurrency();
} else if (command === 'set-currency') {
	if (currency.currencyExists(argv.currency)) {
		currency.setCurrency(argv.currency);
		console.log(chalk.green("Currency successfully changed to", argv.currency.toUpperCase()));
	} else {
		console.log(chalk.red("Invalid currency code. Use 'list-currency' to view the list of supported currencies."));
		console.log(chalk.red("(e.g. To set the currency to Canadian Dollars, use 'node app.js set-currency -c=CAD')"));
	}
} else if (command === 'list-currency') {
	currency.displayCurrencyList();
} else {
	console.log(chalk.red("Unrecognized command. Use '--help' to see the list of available commands."));
}