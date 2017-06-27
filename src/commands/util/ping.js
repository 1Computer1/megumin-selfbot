const { Command } = require('discord-akairo');

class PingCommand extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping'],
            category: 'util'
        });
    }

    async exec(message) {
        const sent = await message.edit('🏓\u2000Pong!');
        const diff = sent.editedAt - sent.createdAt;
        const o = 'o'.repeat(Math.max(1, diff / 50));
        return sent.edit(`🏓\u2000P${o}ng! (${diff} ms)`);
    }
}

module.exports = PingCommand;
