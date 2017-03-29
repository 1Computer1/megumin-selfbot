const { Command } = require('discord-akairo');

function exec(message, args) {
    let emojiSet;

    if (!message.guild || !message.guild.emojis.size) {
        emojiSet = this.client.user.premium ? this.client.emojis : this.client.emojis.filter(e => e.managed);
    } else {
        emojiSet = message.guild.emojis;
    }

    if (emojiSet.size === 0) {
        this.client.logger.log(3, 'No custom emojis to react with.');
        return message.delete();
    }

    let emojis = emojiSet.array();

    let curr = emojis.length;
    let temp;
    let rand;

    while (curr !== 0) {
        rand = Math.floor(Math.random() * curr);
        curr--;

        temp = emojis[curr];
        emojis[curr] = emojis[rand];
        emojis[rand] = temp;
    }

    emojis = emojis.slice(0, Math.min(args.amount, 20));

    return message.delete().then(() => message.channel.fetchMessages({ limit: 2 }).then(messages => {
        const reactee = messages.first();
        if (!reactee) return undefined;

        const react = i => {
            if (!emojis[i]) return undefined;
            return reactee.react(emojis[i]).then(() => react(i + 1));
        };

        return react(0);
    }));
}

module.exports = new Command('superreact', exec, {
    aliases: ['superreact'],
    args: [
        {
            id: 'amount',
            type: 'integer',
            default: 1
        }
    ],
    category: 'fun'
});
