const { Command } = require('discord-akairo');

function exec(message, args) {
    return message.editCode('css', `>${args.content.replace(/\n/g, '\n>')}`);
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
