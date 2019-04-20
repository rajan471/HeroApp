const chalk = require('chalk');
const log = console.log;

/**
 * A logger needs to be more informative. We can add more features like:
 * 1. error log stack trace
 * 2. IP logged
 * 3. User details like activities as well.
 */
let logger = {
    error: function (error, user = 'system', level = 'Error', bgColor = 'bgRed', color = 'white') {
        let message = error.message;
        let logMsg = `${!!level ? chalk[color].bold[bgColor](level) + ' => ' : ''}${chalk.green(!!user ? user + ' ' : '')}${message}`;
        if (user == 'system') { logMsg = chalk.red(`${message}`) };
        log(logMsg, error.stack);
    },
    log: function (message, user = 'system', level = 'OK', bgColor = 'bgBlack', color = 'white') {
        let logMsg = `${!!level ? chalk[color].bold[bgColor](level) + ' => ' : ''}${chalk.green(!!user ? user + ' ' : '')}${message}`;
        if (user == 'system') { logMsg = chalk.yellow(`${message}`) };
        log(logMsg);
    }
};

module.exports = logger;