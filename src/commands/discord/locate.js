const { Command } = require('discord-akairo');
const Logger = require('../../util/Logger');

class LocateCommand extends Command {
    constructor() {
        super('locate', {
            aliases: ['locate'],
            category: 'discord',
            args: [
                {
                    id: 'emoji',
                    type: word => {
                        if (!word) return null;
                        const emoji = this.client.util.resolveEmoji(word, this.client.emojis);
                        return emoji || null;
                    }
                }
            ]
        });
    }

    exec(message, { emoji }) {
        if (!emoji) {
            Logger.error('Invalid custom emoji provided.');
            return message.delete();
        }

        return message.edit(`${emoji} is from ${emoji.guild.name}.`);
    }
}

module.exports = LocateCommand;
