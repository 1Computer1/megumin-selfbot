const { Command } = require('discord-akairo');

function exec(message, args){
    return message.editCode('fix', args.content.split('\n').join('<\n') + '<');
}

module.exports = new Command('orangetext', exec, {
    aliases: ['orangetext', 'orange'],
    args: [
        {
            id: 'content',
            match: 'content',
            defaultValue: '\u200B'
        }
    ],
    category: 'fun'
});
