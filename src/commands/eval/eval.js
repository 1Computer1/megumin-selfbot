/* eslint-disable no-unused-vars */

const util = require('util');

const { Command } = require('discord-akairo');
const Logger = require('../../util/Logger');

const data = {};

class EvalCommand extends Command {
    constructor() {
        super('eval', {
            aliases: ['eval', 'e'],
            category: 'eval',
            args: [
                {
                    id: 'code',
                    match: 'content'
                }
            ]
        });
    }

    async exec(message, { code, input }) {
        if (!code) {
            Logger.error('No code provided to evaluate.');
            await message.delete();
            return;
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

            if (evaled.output.length + code.length > 1900) evaled.output = 'Output too long.';
            message.edit(`📥\u2000**Input**${cb}js\n${input || code}\n${cb}\n${title}${cb}js\n${evaled.output}\n${cb}`);
        };

        const msg = message;
        const mesg = message;
        const client = this.client;
        const bot = this.client;
        const cb = '```';

        try {
            let output = eval(code);
            if (output instanceof Promise) output = await output;

            output = util.inspect(output, { depth: 0 });
            output = `${logs.join('\n')}\n${logs.length && output === 'undefined' ? '' : output}`;
            output = output.replace(tokenRegex, '[TOKEN]');

            if (output.length + code.length > 1900) output = 'Output too long.';

            await message.edit([
                `📥\u2000**Input**${cb}js`,
                input || code,
                cb,
                `📤\u2000**Output**${cb}js`,
                output,
                cb
            ]);

            evaled.errored = false;
            evaled.output = output;
        } catch (err) {
            Logger.error('Evaluation errored.');
            Logger.stacktrace(err);

            let e = err.toString();
            e = `${logs.join('\n')}\n${logs.length && e === 'undefined' ? '' : e}`;
            e = e.replace(tokenRegex, '[TOKEN]');

            await message.edit([
                `📥\u2000**Input**${cb}js`,
                input || code,
                cb,
                `☠\u2000**Error**${cb}js`,
                e,
                cb
            ]);

            evaled.errored = true;
            evaled.output = e;
        }
    }
}

module.exports = EvalCommand;
