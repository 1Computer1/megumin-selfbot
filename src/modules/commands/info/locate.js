const { Command } = require('discord-akairo');
const Logger = require('../../../util/Logger');

function exec(message, args) {
    if (!args.emoji) {
        Logger.warn('Invalid custom emoji provided.');
        return message.delete();
    }

    return message.edit(`${args.emoji} is from ${args.emoji.guild.name}.`);
}

module.exports = new Command('locate', exec, {
    aliases: ['locate'],
    args: [
        {
            id: 'emoji',
            type: 'emoji'
        }
    ]
});
