const { Command } = require('discord-akairo');

function exec(message, args) {
    if (!args.code) {
        this.client.logger.log(3, 'No code provided to evaluate.');
        return message.delete();
    }

    args.actualInput = args.code;
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
