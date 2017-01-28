/* eslint no-unused-vars: "off" */ // Would be nice to have some stuff for eval().

const { Command } = require('discord-akairo');
const util = require('util');
const config = require('../../data/config.json');
const tags = require('../../data/tags.json');
const images = require('../../data/images.json');
const data = {};

function exec(message, args){
    if (!args.code){
        this.framework.logger.log(3, 'No code provided to evaluate.');
        return message.delete();
    }

    const result = new Promise((resolve, reject) => resolve(eval(args.code)));
    const cb = '```';

    return result.then(output => {
        if (typeof output !== 'string') output = util.inspect(output);
        if (output.includes(config.token)) output = output.replace(config.token, '[TOKEN]');
        if (output.length > 2000) output = 'Over 2000 characters.';

        return message.edit(`📥\u2000**Input**${cb}js\n${args.code}\n${cb}\n📤\u2000**Output** ${cb}js\n${output}\n${cb}`);
    }).catch(err => {
        this.framework.logger.log(2, 'Evaluation errored.');
        console.error(err);

        err = err.toString();
        if (err.includes(config.token)) err = err.replace(config.token, '[TOKEN]');

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
