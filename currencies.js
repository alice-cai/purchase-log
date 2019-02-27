// CAD
console.log(new Intl.NumberFormat('en-CAD', { style: 'currency', currency: 'CAD', maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(number));

// USD
console.log(new Intl.NumberFormat('en-USD', { style: 'currency', currency: 'USD', maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(number));

// JAPAN
console.log(new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(number));

// EUROPE
console.log(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(number));

// CHINA
console.log(new Intl.NumberFormat('CN', { style: 'currency', currency: 'CNY' }).format(number));

// INDIA
console.log(new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(number));


['CAD', 'USD', 'CNY', 'EUR', 'JPY', 'INR'];

/*
how to implement support for this?
- make a text file with all valid currencies
- make a text file to store the user's option
- hardcode all the currencies; would have to read from file and check the options each time
*/