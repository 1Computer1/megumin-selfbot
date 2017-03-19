/* eslint-disable no-unused-vars */

const { Command } = require('discord-akairo');
const util = require('util');
const data = {};

function exec(message, args) {
    if (!args.code) {
        this.client.logger.log(3, 'No code provided to evaluate.');
        return message.delete();
    }

    const evaled = {};
    const logs = [];

    const token = this.client.token.split('').join('[\\s\\S]{0,2}');
    const rev = this.client.token.split('').reverse().join('[\\s\\S]{0,2}');
    const tokenRegex = new RegExp(`${token}|${rev}`, 'g');

    const print = (...a) => {
        const cleaned = a.map(o => {
            if (typeof o !== 'string') o = util.inspect(o);
            return o.replace(tokenRegex, '[TOKEN]');
        });

        if (!evaled.output) {
            logs.push(...cleaned);
            return;
        }

        evaled.output += evaled.output.endsWith('\n') ? cleaned.join(' ') : `\n${cleaned.join(' ')}`;
        const title = evaled.errored ? '☠\u2000**Error**' : '📤\u2000**Output**';

        if (evaled.output.length + args.code.length > 1900) evaled.output = 'Output too long.';
        message.edit(`📥\u2000**Input**${cb}js\n${args.actualInput || args.code}\n${cb}\n${title}${cb}js\n${evaled.output}\n${cb}`);
    };

    const result = new Promise(resolve => resolve(eval(args.code)));
    const cb = '```';

    return result.then(output => {
        if (typeof output !== 'string') output = util.inspect(output);
        output = `${logs.join('\n')}\n${logs.length && output === 'undefined' ? '' : output}`;
        output = output.replace(tokenRegex, '[TOKEN]');

        if (output.length + args.code.length > 1900) output = 'Output too long.';

        return message.edit(`📥\u2000**Input**${cb}js\n${args.actualInput || args.code}\n${cb}\n📤\u2000**Output**${cb}js\n${output}\n${cb}`).then(() => {
            evaled.errored = false;
            evaled.output = output;
        });
    }).catch(err => {
        this.client.logger.log(2, 'Evaluation errored.');
        console.error(err); // eslint-disable-line no-console

        err = err.toString();
        err = `${logs.join('\n')}\n${logs.length && err === 'undefined' ? '' : err}`;
        err = err.replace(tokenRegex, '[TOKEN]');

        return message.edit(`📥\u2000**Input**${cb}js\n${args.actualInput || args.code}\n${cb}\n☠\u2000**Error**${cb}js\n${err}\n${cb}`).then(() => {
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
