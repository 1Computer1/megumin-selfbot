const { Command } = require('discord-akairo');

function exec(message, args){
    return this.client.user.setGame(args.game).then(() => {
        if (this.client.user.presence.game){
            this.framework.logger.log(1, `Game set to "${this.client.user.presence.game.name}"`);
        } else {
            this.framework.logger.log(1, 'Game set to not playing.');
        }

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
    ]
});
