const { Command } = require('discord-akairo');

function exec(message, args) {
    return message.edit(`>${args.content.replace(/\n/g, '\n>')}`, { code: 'css' });
}

module.exports = new Command('greentext', exec, {
    aliases: ['greentext', 'green'],
    args: [
        {
            id: 'content',
            match: 'content',
            default: '\u200B'
        }
    ],
    category: 'fun'
});
