const { Command } = require('discord-akairo');
const childProcess = require('child_process');

function exec(message, args) {
    if (!args.code) {
        this.client.logger.log(3, 'No code provided to evaluate.');
        return message.delete();
    }

    const cb = '```';
    const input = args.code.replace(/\n/g, '\\n').replace(/"/g, '\\"').replace(/'/g, '\\\'');

    return new Promise((resolve, reject) => {
        childProcess.exec(`python -c "exec('${input}')"`, (err, stdout, stderr) => {
            if (err || stderr) return reject(err || stderr);
            return resolve(stdout);
        });
    }).then(stdout => {
        if (stdout.length + args.code.length > 1900) stdout = 'Output too long.';
        return message.edit(`🐍\u2000**Input**${cb}py\n${args.code}\n${cb}\n📤\u2000**Output**${cb}py\n${stdout}\n${cb}`);
    }).catch(err => {
        this.client.logger.log(2, 'Evaluation errored.');
        console.error(err); // eslint-disable-line no-console

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
