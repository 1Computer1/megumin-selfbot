/* eslint no-unused-vars: "off" */ // Would be nice to have some stuff for eval().

const { Command } = require('discord-akairo');
const util = require('util');
const data = {};

function exec(message, args){
    if (!args.code){
        this.client.logger.log(3, 'No code provided to evaluate.');
        return message.delete();
    }

    const result = new Promise((resolve, reject) => resolve(eval(args.code)));
    const cb = '```';

    return result.then(output => {
        if (typeof output !== 'string') output = util.inspect(output);
        if (output.includes(this.client.config.token)) output = output.replace(this.client.config.token, '[TOKEN]');
        if (output.length + args.code.length > 1900) output = 'Output too long.';

        return message.edit(`📥\u2000**Input**${cb}js\n${args.code}\n${cb}\n📤\u2000**Output** ${cb}js\n${output}\n${cb}`);
    }).catch(err => {
        this.client.logger.log(2, 'Evaluation errored.');
        console.error(err);

        err = err.toString();
        if (err.includes(this.client.config.token)) err = err.replace(this.client.config.token, '[TOKEN]');

        return message.edit(`📥\u2000**Input**${cb}js\n${args.code}\n${cb}\n☠\u2000**Error** ${cb}js\n${err}\n${cb}`);
    });
}

module.exports = new Command('eval', exec, {
    aliases: ['eval', 'e'],
    args: [
        {
            id: 'code',
            match: 'content'
        }
    ]
});
