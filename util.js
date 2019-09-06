const chalk = require('chalk');	

/**
 * Prompts the user to confirm an action. Meant to be used for warning the user
 * when they are about to perform an action that may have unwanted side effects.
 *
 * @param {string} arg A brief description of the action that the user is
 *   attempting to perform and the potential risks associated with it.
 * 
 * @return {boolean} A promise object that will resolve with a boolean indicating
 *   whether the user confirmed that they want to proceed with the action.
 */
const requestConfirmation = actionDescription => {
	return new Promise((resolve, reject) => {
		const CONFIRM = 'Y';
		const ABORT = 'N';

		process.stdin.setEncoding('utf-8');
		console.log(chalk.red(actionDescription));
		process.stdout.write("Would you like to proceed [Y/N]? ");

		process.stdin.on('data', input => {
			input = input.trim().toUpperCase();

			if (input === CONFIRM) {
				resolve(true);
				process.stdin.pause();
			} else if (input === ABORT) {
				resolve(false);
				process.stdin.pause();
			} else {
				process.stdout.write("Please enter either 'Y' or 'N': ");
			}
		});
	});
};

module.exports = {
	requestConfirmation
};