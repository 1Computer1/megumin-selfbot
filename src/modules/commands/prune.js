const { Command } = require('discord-akairo');

function exec(message, args){
    args.amount = Math.max(Math.min(args.amount, 100), 1);

    return message.channel.fetchMessages({ limit: 100 }).then((messages) => {
        const ownMessages = messages.filter(msg => msg.author.id === this.client.user.id).array();
        ownMessages.length = args.amount + 1;
        
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
