const { Command } = require('discord-akairo');

function exec(message, args){
    let emojiSet;

    if (!message.guild || !message.guild.emojis.size){
        emojiSet = this.client.user.premium ? this.client.emojis : this.client.emojis.filter(e => e.managed);
    } else {
        emojiSet = message.guild.emojis;
    }

    if (emojiSet.size === 0){
        this.client.logger.log(3, 'No custom emojis to react with.');
        return message.delete();
    }

    let emojis = emojiSet.array();

    let currentIndex = emojis.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        temporaryValue = emojis[currentIndex];
        emojis[currentIndex] = emojis[randomIndex];
        emojis[randomIndex] = temporaryValue;
    }

    emojis = emojis.slice(0, Math.min(args.amount, 20));

    return message.delete().then(() => message.channel.fetchMessages({ limit: 2 }).then(messages => {
        const reactee = messages.first();
        if (!reactee) return;

        const react = i => {
            if (!emojis[i]) return;
            setTimeout(() => reactee.react(emojis[i]).then(() => react(i + 1)));
        };

        react(0);
    }));
}

module.exports = new Command('superreact', exec, {
    aliases: ['superreact'],
    args: [
        {
            id: 'amount',
            type: 'integer',
            defaultValue: 1
        }
    ],
    category: 'fun'
});
