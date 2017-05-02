const { Command } = require('discord-akairo');
const Logger = require('../../../util/Logger');

function exec(message, args) {
    if (!args.code) {
        Logger.warn('No code provided to evaluate.');
        return message.delete();
    }

    args.input = args.code;
    args.code = `(async()=>{${args.code}})()`;
    return this.handler.modules.get('eval').exec(message, args);
}

module.exports = new Command('async', exec, {
    aliases: ['async', 'a'],
    args: [
        {
            id: 'code',
            match: 'content'
        }
    ],
    category: 'util'
});
