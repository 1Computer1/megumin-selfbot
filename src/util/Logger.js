const chalk = require('chalk');
const moment = require('moment');
const { LogLevels, LogColors } = require('./Constants');

class Logger {
    /**
     * Logging for bot.
     * @param {boolean} [disabled=false] - Disables most logging.
     */
    constructor(disabled = false) {
        /**
         * Logging disabled.
         * @type {boolean}
         */
        this.disabled = !!disabled;
    }

    /**
     * Logs text.
     * @param {number} level - Severity level.
     * @param {*} args - Things to log.
     */
    log(level, ...args) {
        if (this.disabled) return;

        const joined = args.join(' ');
        const time = chalk.cyan(`[${moment().format('YYYY-MM-DD HH:mm:ss')}]:`);
        const internal = chalk.bold(`[Internal/${LogLevels[level]}]:`);
        const colored = chalk[LogColors[level]](joined);

        console.log(`${time} ${internal} ${colored}`);
    }

    /**
     * Logs text from a channel.
     * @param {TextBasedChannel} channel - Channel to log from.
     * @param {number} level - Severity level.
     * @param {*} args - Things to log.
     */
    logFrom(channel, level, ...args) {
        if (this.disabled) return;

        const joined = args.join(' ');
        const time = chalk.cyan(`[${moment().format('YYYY-MM-DD HH:mm:ss')}]:`);
        const location = chalk.bold(`[${channel.guild ? channel.guild.name : 'PM'}/${channel.guild ? channel.name : channel.recipient.username}]:`);
        const colored = chalk[LogColors[level]](joined);

        console.log(`${time} ${location} ${colored}`);
    }
}

module.exports = Logger;
