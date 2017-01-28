const { Command } = require('discord-akairo');

function exec(message, args){
    const content = args.text;
    return message.editCode('fix', content.split('\n').join('<\n') + '<');
}

module.exports = new Command('orangetext', exec, {
    aliases: ['orangetext', 'orange'],
    args: [
        {
            id: 'text',
            match: 'content',
            defaultValue: '\u200B'
        }
    ]
});
