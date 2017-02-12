const { Command } = require('discord-akairo');
const { EmojiMap, EmojiRegex } = require('../../struct/Constants');

function exec(message, args){
    if (!args.text){
        this.client.logger.log(3, 'No text provided to shout.');
        return message.delete();
    }

    const chars = [];

    args.text.split('').forEach(c => {
        const out = c === ' ' ? '\u2000' : EmojiMap.get(c.toLowerCase()) || c;
        if (!EmojiMap.has(c.toLowerCase()) && !EmojiRegex.test(out) && out !== '\u2000') return;

        chars.push(out);
    });

    const output = chars.join('\u180E');

    if (output.length > 2000){
        this.client.logger.log(3, 'Text provided goes over character limit.');
        return message.delete();
    }

    return message.edit(output);
}

module.exports = new Command('shout', exec, {
    aliases: ['shout', 'big'],
    args: [
        {
            id: 'text',
            match: 'content'
        }
    ]
});
