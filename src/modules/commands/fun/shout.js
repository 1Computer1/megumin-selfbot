const { Command } = require('discord-akairo');
const { EmojiMap, EmojiRegex } = require('../../../util/Constants');
const Logger = require('../../../util/Logger');

function exec(message, args) {
    if (!args.content) {
        Logger.warn('No text provided to shout.');
        return message.delete();
    }

    let customEmojis = this.client.premium ? this.client.emojis : this.client.emojis.filter(e => e.managed);

    if (message.guild) {
        customEmojis = customEmojis.concat(message.guild.emojis);
    }

    const chars = [];

    for (const c of args.content.match(/<:[a-zA-Z0-9_]+:(\d+)>|./g)) {
        const out = c === ' ' ? '\u2000' : EmojiMap[c.toLowerCase()] || c;

        const custom = c.match(/<:[a-zA-Z0-9_]+:(\d+)>/);

        if (custom) {
            chars.push(customEmojis.get(custom[1]));
            continue;
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
