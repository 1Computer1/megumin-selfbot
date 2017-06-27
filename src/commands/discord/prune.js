const { Command } = require('discord-akairo');

class PruneCommand extends Command {
    constructor() {
        super('prune', {
            aliases: ['prune', 'delete', 'del'],
            category: 'discord',
            args: [
                {
                    id: 'amount',
                    type: 'integer',
                    default: 10
                }
            ]
        });
    }

    async exec(message, { amount }) {
        amount = Math.min(amount, 100);

        const messages = await message.channel.fetchMessages({ limit: 100 });
        const promises = [];

        for (const m of messages.values()) {
            if (promises.length > amount) break;
            if (m.author.id !== this.client.user.id) continue;
            promises.push(m.delete());
        }

        return Promise.all(promises);
    }
}

module.exports = PruneCommand;
