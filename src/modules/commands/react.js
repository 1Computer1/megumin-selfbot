const { Command } = require('discord-akairo');
const { EmojiMap, EmojiRegex } = require('../../util/Constants');

function exec(message, args){
    if (!args.text){
        this.client.logger.log(3, 'No text provided to react.');
        return message.delete();
    }

    let chars = [];

    for (const c of args.text.match(/<.+?>|./g)){
        const out = EmojiMap.get(c.toLowerCase()) || c;

        const custom = this.client.util.resolveEmoji(out, message.guild, false, true);

        if (custom){
            chars.push(custom);
            continue;
        }

        if (!EmojiMap.has(c.toLowerCase()) && !EmojiRegex.test(out)) continue;
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
            id: 'text',
            match: 'content'
        }
    ]
});
