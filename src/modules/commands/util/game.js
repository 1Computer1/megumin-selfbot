const { Command } = require('discord-akairo');
const Logger = require('../../../util/Logger');

function exec(message, args) {
    if (!args.game) {
        return this.client.user.setGame(null).then(() => {
            Logger.info('Game set to not playing.');
            return message.delete();
        });
    }

    return this.client.user.setGame(args.game).then(() => {
        Logger.info(`Game set to "${this.client.user.presence.game.name}"`);
        return message.delete();
    });
}

module.exports = new Command('game', exec, {
    aliases: ['game'],
    args: [
        {
            id: 'game',
            match: 'content'
        }
    ],
    category: 'util'
});
