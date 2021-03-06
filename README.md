# purchase log

## description

This is a Node.js application that allows the user to log and categorize their past purchases. It automatically calculates the total amount of money spent per spending category and displays it in a table format.

```
------ Total Expenses ------

Food               CA$  76.00
Transportation     CA$  34.00
Personal           CA$  55.00
Entertainment      CA$  28.00
---
Total              CA$ 193.00
```

The following currencies are supported:

- Canadian Dollar
- US Dollar
- Chinese Yuan
- Euro
- Japanese Yen
- Indian Rupee

(Created in Feb 2019 to help familiarize myself with Node.js.)

## installation (terminal)

Clone the repository by running the following command:

```
git clone https://github.com/alice-cai/purchase-log.git
```

Navigate to the purchase-log directory and install the required npm modules.

```
npm install
```

## available commands

```
app.js [command]

Commands:
  app.js add            add a new purchase to the log
  app.js list           list all purchases in the purchase log
  app.js remove         remove a purchase from the log
  app.js remove-all     remove all purchases from the log
  app.js add-cat        add a category
  app.js list-cat       list all categories
  app.js remove-cat     remove a category
  app.js total          display total amount spent per category
  app.js currency       display the current currency
  app.js list-currency  display the list of currencies
  app.js set-currency   set the currency

Options:
  --version  Show version number                       [boolean]
  --help     Show help                                 [boolean]
```

Use 'node app.js [command] --help' to view details about each command.