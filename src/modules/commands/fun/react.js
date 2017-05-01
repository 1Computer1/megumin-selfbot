const { Command } = require('discord-akairo');
const { EmojiMap, EmojiRegex, EmojiAlts } = require('../../../util/Constants');
const Logger = require('../../../util/Logger');

function exec(message, args) {
    if (!args.content) {
        Logger.warn('No text provided to react.');
        return message.delete();
    }

    let chars = [];
    let customEmojis = this.client.premium ? this.client.emojis : this.client.emojis.filter(e => e.managed);

    if (message.guild) {
        customEmojis = customEmojis.concat(message.guild.emojis);
    }

    for (const c of args.content.match(/<:[a-zA-Z0-9_]+:(\d+)>|./g)) {
        let out = EmojiMap[c.toLowerCase()] || c;

        const custom = c.match(/<:[a-zA-Z0-9_]+:(\d+)>/);

        if (custom) {
            chars.push(customEmojis.get(custom[1]));
            continue;
        }

        if (!EmojiMap[c.toLowerCase()] && !EmojiRegex.test(out)) continue;
        if (chars.includes(out)) out = EmojiAlts[out] || out;
        chars.push(out);
    }

    chars = Array.from(new Set(chars));
    chars.length = Math.min(chars.length, 20);

    return message.delete().then(() => message.channel.fetchMessages({ limit: 2 }).then(messages => {
        const reactee = messages.first();
        if (!reactee) return undefined;

        const react = i => {
            if (!chars[i]) return undefined;
            return reactee.react(chars[i]).then(() => react(i + 1));
        };

        return react(0);
    }));
}

module.exports = new Command('react', exec, {
    aliases: ['react', 'r'],
    args: [
        {
            id: 'content',
            match: 'content'
        }
    ],
    category: 'fun'
});
