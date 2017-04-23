const { Command } = require('discord-akairo');

function exec(message, args) {
    return message.edit(`${args.content.replace(/\n/g, '<\n')}<`, { code: 'fix' });
}

module.exports = new Command('orangetext', exec, {
    aliases: ['orangetext', 'orange'],
    args: [
        {
            id: 'content',
            match: 'content',
            default: '\u200B'
        }
    ],
    category: 'fun'
});
