const { Command } = require('discord-akairo');
const Logger = require('../../util/Logger');

class GameCommand extends Command {
    constructor() {
        super('game', {
            aliases: ['game'],
            category: 'util',
            args: [
                {
                    id: 'game',
                    match: 'content'
                }
            ]
        });
    }

    async exec(message, { game }) {
        if (!game) {
            await this.client.user.setActivity(null);
            Logger.info('Game set to not playing.');
            return message.delete();
        }

        await this.client.user.setActivity(game);
        Logger.info(`Game set to "${this.client.user.presence.game.name}"`);
        return message.delete();
    }
}

module.exports = GameCommand;
