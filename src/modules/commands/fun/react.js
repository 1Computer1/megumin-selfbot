const { Command } = require('discord-akairo');
const { EmojiMap, EmojiRegex, EmojiAlts } = require('../../../util/Constants');

function exec(message, args){
    if (!args.content){
        this.client.logger.log(3, 'No text provided to react.');
        return message.delete();
    }

    let chars = [];

    for (const c of args.content.match(/<.+?>|./g)){
        let out = EmojiMap.get(c.toLowerCase()) || c;

        const custom = this.client.util.resolveEmoji(out, message.guild, false, true);

        if (custom){
            chars.push(custom);
            continue;
        }

        if (!EmojiMap.has(c.toLowerCase()) && !EmojiRegex.test(out)) continue;
        if (chars.includes(out)) out = EmojiAlts.get(out) || out;
        chars.push(out);
    }

    chars = Array.from(new Set(chars));
    chars.length = Math.min(chars.length, 20);

    return message.delete().then(() => message.channel.fetchMessages({ limit: 2 }).then(messages => {
        const reactee = messages.first();
        if (!reactee) return;

        const react = i => {
            if (!chars[i]) return;
            setTimeout(() => reactee.react(chars[i]).then(() => react(i + 1)));
        };

        react(0);
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
