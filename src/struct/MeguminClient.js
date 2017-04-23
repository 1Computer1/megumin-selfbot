const { AkairoClient } = require('discord-akairo');

class MeguminClient extends AkairoClient {
    constructor(config) {
        super({
            prefix: config.prefix,
            allowMention: false,
            handleEdits: true,
            commandUtil: false,
            selfbot: true,
            emitters: { process },
            commandDirectory: './src/modules/commands',
            listenerDirectory: './src/modules/listeners'
        }, {
            maxMessageCache: config.cache === undefined ? 50 : config.cache,
            disableEveryone: true,
            disabledEvents: [
                'TYPING_START',
                'MESSAGE_DELETE',
                'GUILD_MEMBER_UPDATE',
                'PRESENCE_UPDATE',
                config.cache === 0 ? 'MESSAGE_UPDATE' : ''
            ]
        });

        this.config = config;
        this.tags = require('../data/tags.json');
        this.images = require('../data/images.json');
    }

    color(message) {
        if (this.config.color === 'random') {
            return (1 << 24) * Math.random() | 0;
        }

        if (this.config.color === 'auto') {
            return message.guild ? this.util.displayColor(message.member) : 0;
        }

        return this.config.color || 0;
    }

    start() {
        return this.login(this.config.token);
    }
}

module.exports = MeguminClient;
