let output = (amount) => {
	console.log(new Intl.NumberFormat('en-USD', {style: 'currency', currency: 'USD', maximumFractionDigits: 2, minimumFractionDigits: 2}).format(amount));
};

module.exports = {
	output
};