const { Command } = require('discord-akairo');
const { EmojiMap, EmojiRegex } = require('../../../util/Constants');
const Logger = require('../../../util/Logger');

function exec(message, args) {
    if (!args.content) {
        Logger.warn('No text provided to shout.');
        return message.delete();
    }

    const chars = [];

    for (const c of args.content.match(/<.+?>|./g)) {
        const out = c === ' ' ? '\u2000' : EmojiMap[c.toLowerCase()] || c;

        if (message.guild) {
            const custom = this.client.util.resolveEmoji(out, message.guild.emojis, false, true);

            if (custom) {
                chars.push(custom);
                continue;
            }
        }

        if (!EmojiMap[c.toLowerCase()] && !EmojiRegex.test(out) && out !== '\u2000') continue;
        chars.push(out);
    }

    const output = chars.join('\u180E');

    if (output.length > 2000) {
        Logger.warn('Text provided goes over character limit.');
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
    ],
    category: 'fun'
});
