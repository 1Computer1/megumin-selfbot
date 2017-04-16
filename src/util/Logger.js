const Constants = require('./Constants');
const chalk = require('chalk');
const moment = require('moment');
const util = require('util');

class Logger {
    static _cleanArgs(args) {
        const texts = [];

        for (const arg of args) {
            if (typeof arg === 'string') {
                texts.push(arg);
                continue;
            }

            texts.push(util.inspect(arg));
        }

        return texts.join(' ');
    }

    static _log(level, ...args) {
        const texts = this._cleanArgs(args);

        const time = chalk.cyan(`[${moment().format('YYYY-MM-DD HH:mm:ss')}]:`);
        const internal = chalk.bold(`[Internal/${Constants.LogLevels[level]}]:`);
        const colored = chalk[Constants.LogColors[level]](texts);

        if (level === 4) {
            process.stderr.write(`${time} ${internal} ${colored}\n`);
            return;
        }

        process.stdout.write(`${time} ${internal} ${colored}\n`);
    }

    /**
     * Sends level 0 log ([Log]).
     * @param {...any} args - Things to log.
     * @returns {void}
     */
    static log(...args) {
        this._log(0, ...args);
    }

    /**
     * Sends level 1 log ([Info]).
     * @param {...any} args - Things to log.
     * @returns {void}
     */
    static info(...args) {
        this._log(1, ...args);
    }

    /**
     * Sends level 2 log ([Debug]).
     * @param {...any} args - Things to log.
     * @returns {void}
     */
    static debug(...args) {
        this._log(2, ...args);
    }

    /**
     * Sends level 3 log ([Warn]).
     * @param {...any} args - Things to log.
     * @returns {void}
     */
    static warn(...args) {
        this._log(3, ...args);
    }

    /**
     * Sends level 4 log ([Error]).
     * @param {...any} args - Things to log.
     * @returns {void}
     */
    static error(...args) {
        this._log(4, ...args);
    }
}

module.exports = Logger;
