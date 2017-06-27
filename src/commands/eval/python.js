const childProcess = require('child_process');

const { Command } = require('discord-akairo');
const Logger = require('../../util/Logger');

class PythonCommand extends Command {
    constructor() {
        super('python', {
            aliases: ['python', 'py'],
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
        const input = code.replace(/\\n/, '\\\\n').replace(/\n/g, '\\n').replace(/"/g, '\\"').replace(/'/g, '\\\'');

        try {
            let output = await new Promise((resolve, reject) => {
                childProcess.exec(`python -c "exec('${input}')"`, (err, stdout, stderr) => {
                    if (err || stderr) return reject(err || stderr);
                    return resolve(stdout);
                });
            });

            if (output.length + code.length > 1900) output = 'Output too long.';
            return message.edit([
                `🐍\u2000**Input**${cb}py`,
                code,
                cb,
                `📤\u2000**Output**${cb}py`,
                output,
                cb
            ]);
        } catch (err) {
            Logger.error('Evaluation errored.');
            Logger.stacktrace(err);

            let e = err.toString().replace(/Error: Command failed:.+/, '');
            if (e.length + code.length > 1900) e = 'Output too long.';
            return message.edit([
                `🐍\u2000**Input**${cb}py`,
                code,
                cb,
                `☠\u2000**Output**${cb}py`,
                e,
                cb
            ]);
        }
    }
}

module.exports = PythonCommand;
