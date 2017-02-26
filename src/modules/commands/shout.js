const { Command } = require('discord-akairo');
const { EmojiMap, EmojiRegex } = require('../../util/Constants');

function exec(message, args){
    if (!args.content){
        this.client.logger.log(3, 'No text provided to shout.');
        return message.delete();
    }

    const chars = [];

    for (const c of args.content.match(/<.+?>|./g)){
        const out = c === ' ' ? '\u2000' : EmojiMap.get(c.toLowerCase()) || c;

        const custom = this.client.util.resolveEmoji(out, message.guild, false, true);

        if (custom){
            chars.push(custom);
            continue;
        }

        if (!EmojiMap.has(c.toLowerCase()) && !EmojiRegex.test(out) && out !== '\u2000') continue;
        chars.push(out);
    }

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
            id: 'content',
            match: 'content'
        }
    ]
});
