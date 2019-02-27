const fs = require('fs');

const CATEGORY_FILE = 'data/category-data.json';
const DEFAULT_CATEGORY_FILE = 'data/category-default-data.json';


/**
* fetchCategories(): reads the list of categories from the file and returns it
*/
let fetchCategories = () => {
	try {
		let categoriesString = fs.readFileSync(CATEGORY_FILE);
		return JSON.parse(categoriesString);
	} catch (e) {
		return [];
	}
};


/**
* saveCategories(categoryList): saves categoryList to file
*/
let saveCategories = (categoryList) => {
	fs.writeFileSync(CATEGORY_FILE, JSON.stringify(categoryList));
};


/**
* resetCategories(): resets the category list to the default list
*/
let resetCategories = () => {
	let defaultList = fs.readFileSync(DEFAULT_CATEGORY_FILE);
	fs.writeFileSync(CATEGORY_FILE, defaultList);
};


/**
* getCategories(): returns category list
*/
let getCategories = () => {
	return fetchCategories();
};


/**
* categoryExists(name): returns true if the specified category exists, false otherwise
*/
let categoryExists = (name) => {
	let categoryList = fetchCategories();
	let matchingCategories = categoryList.filter((category) => {
		return name.toUpperCase() === category.toUpperCase()
	});

	return matchingCategories.length > 0;
};


/**
* addCategory(name): adds a category to the list if it does not already exist. returns a
*   boolean indicating whether or not the category was successfully added.
*/
let addCategory = (name) => {
	if (!categoryExists(name)) {
		let categoryList = fetchCategories();
		categoryList.push(name);
		saveCategories(categoryList);
		return true;
	}
};


/**
* removeCategory(name): removes a category from the list if it exists. returns a boolean
*   indicating whether it was removed successfully.
*/
let removeCategory = (name) => {
	let categoryList = fetchCategories();
	let newCategoryList = categoryList.filter(categoryName => categoryName.toUpperCase() !== name.toUpperCase()) ;

	if (categoryList.length !== newCategoryList) {
		saveCategories(newCategoryList);
		return true;
	}
};


/**
* displayAll(): outputs the list of categories.
*/
let displayAll = () => {
	let categoryList = fetchCategories();

	console.log("\nCATEGORY LIST");
	console.log("==============");
	for (category of categoryList) {
		console.log(category);
	}
	console.log();
};

module.exports = {
	getCategories,
	resetCategories,
	categoryExists,
	addCategory,
	removeCategory,
	displayAll
};