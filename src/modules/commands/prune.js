const { Command } = require('discord-akairo');

function exec(message, args){
    args.amount = Math.max(Math.min(args.amount, 100), 1);

    return message.channel.fetchMessages({ limit: 100 }).then(messages => {
        const ownMessages = [];

        for (const m of messages.values()){
            if (ownMessages.length > args.amount) break;
            if (m.author.id !== this.client.user.id) continue;
            ownMessages.push(m);
        }
        
        return Promise.all(ownMessages.map(msg => msg.delete()));
    });
}

module.exports = new Command('prune', exec, {
    aliases: ['prune', 'delete', 'del'],
    args: [
        {
            id: 'amount',
            type: 'integer',
            defaultValue: 10
        }
    ]
});
