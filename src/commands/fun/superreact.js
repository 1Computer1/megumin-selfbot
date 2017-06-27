const { Command } = require('discord-akairo');
const Logger = require('../../util/Logger');

class SuperreactCommand extends Command {
    constructor() {
        super('superreact', {
            aliases: ['superreact'],
            category: 'fun',
            args: [
                {
                    id: 'amount',
                    type: 'integer',
                    default: 1
                }
            ]
        });
    }

    async exec(message, { amount }) {
        let customEmojis = this.client.premium ? this.client.emojis : this.client.emojis.filter(e => e.managed);

        if (message.guild) {
            customEmojis = customEmojis.concat(message.guild.emojis);
        }

        if (!customEmojis.size) {
            Logger.error('No custom emojis to react with.');
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

        emojis = emojis.slice(0, Math.min(Math.max(amount, 1), 20));

        await message.delete();
        const messages = await message.channel.fetchMessages({ limit: 2 });

        const msg = messages.first();
        if (!msg) return undefined;

        const react = async i => {
            if (!emojis[i]) return undefined;
            await msg.react(emojis[i]);
            return react(i + 1);
        };

        return react(0);
    }
}

module.exports = SuperreactCommand;
