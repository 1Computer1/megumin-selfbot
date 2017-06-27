const { Command } = require('discord-akairo');

const { EmojiMap, EmojiRegex, EmojiAlts } = require('../../util/Constants');
const Logger = require('../../util/Logger');

class ReactCommand extends Command {
    constructor() {
        super('react', {
            aliases: ['react', 'r'],
            category: 'fun',
            args: [
                {
                    id: 'text',
                    match: 'content'
                }
            ]
        });
    }

    async exec(message, { text }) {
        if (!text) {
            Logger.error('No text provided to react.');
            return message.delete();
        }

        let chars = [];
        let customEmojis = this.client.premium ? this.client.emojis : this.client.emojis.filter(e => e.managed);

        if (message.guild) {
            customEmojis = customEmojis.concat(message.guild.emojis);
        }

        for (const c of text.match(/<:[a-zA-Z0-9_]+:(\d+)>|./g)) {
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

        await message.delete();
        const messages = await message.channel.fetchMessages({ limit: 2 });

        const msg = messages.first();
        if (!msg) return undefined;

        const react = async i => {
            if (!chars[i]) return undefined;
            await msg.react(chars[i]);
            return react(i + 1);
        };

        return react(0);
    }
}

module.exports = ReactCommand;
