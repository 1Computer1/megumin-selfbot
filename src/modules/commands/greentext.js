const { Command } = require('discord-akairo');

function exec(message, args){
    const content = args.text;
    return message.editCode('css', '>' + content.split('\n').join('\n>'));
}

module.exports = new Command('greentext', exec, {
    aliases: ['greentext', 'green'],
    args: [
        {
            id: 'text',
            match: 'content',
            defaultValue: '\u200B'
        }
    ]
});
