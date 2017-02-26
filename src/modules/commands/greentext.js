const { Command } = require('discord-akairo');

function exec(message, args){
    return message.editCode('css', '>' + args.content.split('\n').join('\n>'));
}

module.exports = new Command('greentext', exec, {
    aliases: ['greentext', 'green'],
    args: [
        {
            id: 'content',
            match: 'content',
            defaultValue: '\u200B'
        }
    ]
});
