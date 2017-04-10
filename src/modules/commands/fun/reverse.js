const { Command } = require('discord-akairo');

function exec(message, args) {
    return message.edit([...args.content].reverse().join(''));
}

module.exports = new Command('reverse', exec, {
    aliases: ['reverse'],
    args: [
        {
            id: 'content',
            match: 'content',
            default: '\u200B'
        }
    ],
    category: 'fun'
});
