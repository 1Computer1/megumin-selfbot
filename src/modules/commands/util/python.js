const { Command } = require('discord-akairo');
const childProcess = require('child_process');
const Logger = require('../../../util/Logger');

function exec(message, args) {
    if (!args.code) {
        Logger.warn('No code provided to evaluate.');
        return message.delete();
    }

    const cb = '```';
    const input = args.code.replace(/^/gm, '\t').replace(/\\n/, '\\\\n').replace(/\n/g, '\\n').replace(/"/g, '\\"').replace(/'/g, '\\\'');
    const code = `def __python_eval():\\n${input}\\nprint(__python_eval())`;

    return new Promise((resolve, reject) => {
        childProcess.exec(`python -c "exec('${code}')"`, (err, stdout, stderr) => {
            if (err || stderr) return reject(err || stderr);
            return resolve(stdout);
        });
    }).then(stdout => {
        if (stdout.length + args.code.length > 1900) stdout = 'Output too long.';
        return message.edit(`🐍\u2000**Input**${cb}py\n${args.code}\n${cb}\n📤\u2000**Output**${cb}py\n${stdout}\n${cb}`);
    }).catch(err => {
        Logger.warn('Evaluation errored.');
        Logger.error(err);

        err = err.toString();
        if (err.length + args.code.length > 1900) err = 'Output too long.';
        return message.edit(`🐍\u2000**Input**${cb}py\n${args.code}\n${cb}\n☠\u2000**Error**${cb}py\n${err}\n${cb}`);
    });
}

module.exports = new Command('python', exec, {
    aliases: ['python', 'py'],
    args: [
        {
            id: 'code',
            match: 'content'
        }
    ]
});
