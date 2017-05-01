const { Command } = require('discord-akairo');
const Logger = require('../../../util/Logger');

function exec(message, args) {
    let customEmojis = this.client.premium ? this.client.emojis : this.client.emojis.filter(e => e.managed);

    if (message.guild) {
        customEmojis = customEmojis.concat(message.guild.emojis);
    }

    if (!customEmojis.size) {
        Logger.warn('No custom emojis to react with.');
        return message.delete();
    }

    let emojis = customEmojis.array();

    let curr = emojis.length;
    let temp;
    let rand;

    while (curr) {
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
