/* eslint-disable no-unused-vars */

const { Command } = require('discord-akairo');
const Logger = require('../../../util/Logger');
const util = require('util');
const data = {};

function exec(message, args) {
    if (!args.code) {
        Logger.warn('No code provided to evaluate.');
        return message.delete();
    }

    const evaled = {};
    const logs = [];

    const token = this.client.token.split('').join('[^]{0,2}');
    const rev = this.client.token.split('').reverse().join('[^]{0,2}');
    const tokenRegex = new RegExp(`${token}|${rev}`, 'g');

    const print = (...a) => {
        const cleaned = a.map(o => {
            o = util.inspect(o, { depth: 0 });
            return o.replace(tokenRegex, '[TOKEN]');
        });

        if (!evaled.output) {
            logs.push(...cleaned);
            return;
        }

        evaled.output += evaled.output.endsWith('\n') ? cleaned.join(' ') : `\n${cleaned.join(' ')}`;
        const title = evaled.errored ? '☠\u2000**Error**' : '📤\u2000**Output**';

        if (evaled.output.length + args.code.length > 1900) evaled.output = 'Output too long.';
        message.edit(`📥\u2000**Input**${cb}js\n${args.input || args.code}\n${cb}\n${title}${cb}js\n${evaled.output}\n${cb}`);
    };

    const msg = message;
    const mesg = message;
    const client = this.client;
    const bot = this.client;

    const result = new Promise(resolve => resolve(eval(args.code)));
    const cb = '```';

    return result.then(output => {
        output = util.inspect(output, { depth: 0 });
        output = `${logs.join('\n')}\n${logs.length && output === 'undefined' ? '' : output}`;
        output = output.replace(tokenRegex, '[TOKEN]');

        if (output.length + args.code.length > 1900) output = 'Output too long.';

        return message.edit(`📥\u2000**Input**${cb}js\n${args.input || args.code}\n${cb}\n📤\u2000**Output**${cb}js\n${output}\n${cb}`).then(() => {
            evaled.errored = false;
            evaled.output = output;
        });
    }).catch(err => {
        Logger.warn('Evaluation errored.');
        Logger.error(err);

        err = err.toString();
        err = `${logs.join('\n')}\n${logs.length && err === 'undefined' ? '' : err}`;
        err = err.replace(tokenRegex, '[TOKEN]');

        return message.edit(`📥\u2000**Input**${cb}js\n${args.input || args.code}\n${cb}\n☠\u2000**Error**${cb}js\n${err}\n${cb}`).then(() => {
            evaled.errored = true;
            evaled.output = err;
        });
    });
}

module.exports = new Command('eval', exec, {
    aliases: ['eval', 'e'],
    args: [
        {
            id: 'code',
            match: 'content'
        }
    ],
    category: 'util'
});
