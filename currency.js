const fs = require('fs');

const CURRENCY_LIST_FILE = 'data/currency-list.json';
const FORMATTED_CURRENCY_LIST_FILE = 'data/currency-list-formatted.json';
const CURRENCY_FILE = 'data/currency.json'; // stores the current currency

const CANADIAN_DOLLAR = "CAD";
const USA_DOLLAR = "USD";
const CHINA_YUAN = "CNY";
const EUROPE_EURO = "EUR";
const JAPAN_YEN = "JPY";
const INDIA_RUPEE = "INR";


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
		console.log("Error retrieving currency list.");
	}

	if (currencyList) {
		console.log("\nSupported Currencies");
		console.log("====================");
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
		console.log("Error fetching current currency.");
		return undefined;
	}
};


let displayCurrentCurrency = () => {
	console.log("Currency set to: ", fetchCurrentCurrency());
};


let setCurrency = (currency) => {
	fs.writeFileSync(CURRENCY_FILE, JSON.stringify(currency.toUpperCase()));
};


let currencyExists = (currency) => {
	let currencyList = fetchCurrencyList();
	let filtered = currencyList.filter(listItem => listItem.toUpperCase() === currency.toUpperCase());

	return filtered.length !== 0;
};


let format = (amount) => {
	let currency = fetchCurrentCurrency();

	switch (currency) {
		case CANADIAN_DOLLAR:
			console.log(new Intl.NumberFormat('en-CAD', { style: 'currency', currency: 'CAD', maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(amount));
			break;
		case USA_DOLLAR:
			console.log(new Intl.NumberFormat('en-USD', { style: 'currency', currency: 'USD', maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(amount));
			break;
		case CHINA_YUAN:
			console.log(new Intl.NumberFormat('CN', { style: 'currency', currency: 'CNY' }).format(amount));
			break;
		case EUROPE_EURO:
			console.log(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(amount));
			break;
		case JAPAN_YEN:
			console.log(new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(amount));
			break;
		case INDIA_RUPEE:
			console.log(new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount));
			break;
	}
};


module.exports = {
	displayCurrencyList,
	displayCurrentCurrency,
	setCurrency,
	currencyExists,
	format
};