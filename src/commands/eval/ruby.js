const childProcess = require('child_process');

const { Command } = require('discord-akairo');
const Logger = require('../../util/Logger');

class RubyCommand extends Command {
    constructor() {
        super('ruby', {
            aliases: ['ruby', 'rb'],
            category: 'eval',
            args: [
                {
                    id: 'code',
                    match: 'content'
                }
            ]
        });
    }

    async exec(message, { code }) {
        if (!code) {
            Logger.error('No code provided to evaluate.');
            return message.delete();
        }

        const cb = '```';
        const input = code.replace(/\\n/, '\\\\n').replace(/\n/g, ';').replace(/"/g, '\\"');

        try {
            let output = await new Promise((resolve, reject) => {
                childProcess.exec(`ruby -e "${input}"`, (err, stdout, stderr) => {
                    if (err || stderr) return reject(err || stderr);
                    return resolve(stdout);
                });
            });

            if (output.length + code.length > 1900) output = 'Output too long.';
            return message.edit([
                `💖\u2000**Input**${cb}ruby`,
                code,
                cb,
                `📤\u2000**Output**${cb}ruby`,
                output,
                cb
            ]);
        } catch (err) {
            Logger.error('Evaluation errored.');
            Logger.stacktrace(err);

            let e = err.toString().replace(/Error: Command failed:.+/, '');
            if (e.length + code.length > 1900) e = 'Output too long.';
            return message.edit([
                `💖\u2000**Input**${cb}ruby`,
                code,
                cb,
                `☠\u2000**Output**${cb}ruby`,
                e,
                cb
            ]);
        }
    }
}

module.exports = RubyCommand;
