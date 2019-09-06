const fs = require('fs');
const chalk = require('chalk');

const CURRENCY_LIST_FILE = 'data/currency-list.json';
const FORMATTED_CURRENCY_LIST_FILE = 'data/currency-list-formatted.json';
const CURRENCY_FILE = 'data/currency.json'; // stores the current currency

// const CANADIAN_DOLLAR = "CAD";
// const USA_DOLLAR = "USD";
// const CHINA_YUAN = "CNY";
// const EUROPE_EURO = "EUR";
// const JAPAN_YEN = "JPY";
// const INDIA_RUPEE = "INR";

const CANADIAN_DOLLAR = {
	code: "CAD",
	symbolLength: 3
};
const USA_DOLLAR = {
	code: "USD",
	symbolLength: 1
};
const CHINA_YUAN = {
	code: "CNY",
	symbolLength: 3
};
const EUROPE_EURO = {
	code: "EUR",
	symbolLength: 1
};
const JAPAN_YEN = {
	code: "JPY",
	symbolLength: 1
};
const INDIA_RUPEE = {
	code: "INR",
	symbolLength: 1
};


let fetchCurrencyList = () => {
	try {
		let currencyListString = fs.readFileSync(CURRENCY_LIST_FILE);
		return JSON.parse(currencyListString);
	} catch (e) {
		return [];
	}
};


let displayCurrencyList = () => {
	let currencyList;

	try {
		let currencyListString = fs.readFileSync(FORMATTED_CURRENCY_LIST_FILE);
		currencyList = JSON.parse(currencyListString);
	} catch (e) {
		console.log(chalk.red("Error retrieving currency list."));
	}

	if (currencyList) {
		console.log(chalk.bold("\nSUPPORTED CURRENCIES:"));
		for (currency of currencyList) {
			console.log(currency);
		}
		console.log();
	}
};


let fetchCurrentCurrency = () => {
	try {
		let currencyString = fs.readFileSync(CURRENCY_FILE);
		return JSON.parse(currencyString);
	} catch (e) {
		console.log(chalk.red("Error fetching current currency."));
		return undefined;
	}
};


let displayCurrentCurrency = () => {
	console.log("Currency set to:", fetchCurrentCurrency());
};


let setCurrency = (currency) => {
	fs.writeFileSync(CURRENCY_FILE, JSON.stringify(currency.toUpperCase()));
};


let currencyExists = (currency) => {
	let currencyList = fetchCurrencyList();
	let filtered = currencyList.filter(listItem => listItem.toUpperCase() === currency.toUpperCase());

	return filtered.length !== 0;
};


let format = (amount, addPadding) => {
	const DEFAULT_PADDDING = 4;

	let currency = fetchCurrentCurrency();
	let formatter;
	let symbolLength;
	//let padding = DEFAULT_PADDDING;

	switch (currency) {
		case CANADIAN_DOLLAR.code:
			formatter = new Intl.NumberFormat('en-CAD', { style: 'currency', currency: 'CAD', maximumFractionDigits: 2, minimumFractionDigits: 2 });
			symbolLength = CANADIAN_DOLLAR.symbolLength;
			break;
		case USA_DOLLAR.code:
			formatter = new Intl.NumberFormat('en-USD', { style: 'currency', currency: 'USD', maximumFractionDigits: 2, minimumFractionDigits: 2 });
			symbolLength = USA_DOLLAR.symbolLength;
			break;
		case CHINA_YUAN.code:
			formatter = new Intl.NumberFormat('CN', { style: 'currency', currency: 'CNY' });
			symbolLength = CHINA_YUAN.symbolLength;
			break;
		case EUROPE_EURO.code:
			formatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
			symbolLength = EUROPE_EURO.symbolLength;
			break;
		case JAPAN_YEN.code:
			formatter = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' });
			symbolLength = JAPAN_YEN.symbolLength;
			break;
		case INDIA_RUPEE.code:
			formatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' });
			symbolLength = INDIA_RUPEE.symbolLength;
			break;
	}

	let output = formatter.format(amount);
	// if (addPadding) {
	// 	output = output.substring(0, symbolLength) + output.substring(symbolLength).padStart(padding);

	// }
	console.log(output);
};


module.exports = {
	displayCurrencyList,
	displayCurrentCurrency,
	setCurrency,
	currencyExists,
	format
};