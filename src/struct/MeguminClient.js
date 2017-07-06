const { AkairoClient } = require('discord-akairo');
const Logger = require('../util/Logger');

class MeguminClient extends AkairoClient {
    constructor(config) {
        super({
            prefix: config.prefix,
            allowMention: false,
            handleEdits: true,
            commandUtil: false,
            selfbot: true,
            commandDirectory: './src/commands',
            listenerDirectory: './src/listeners',
            inhibitorDirectory: './src/inhibitors'
        }, {
            maxMessageCache: config.cache === undefined ? 50 : config.cache,
            disableEveryone: true,
            disabledEvents: [
                'TYPING_START',
                'GUILD_MEMBER_UPDATE',
                'PRESENCE_UPDATE',
                config.cache === 0 ? 'MESSAGE_UPDATE' : ''
            ]
        });

        this.config = config;
        this.deleteCache = {};
        this.tags = require('../data/tags.json');
        this.images = require('../data/images.json');
    }

    getColor(message) {
        if (this.config.color === 'random') {
            return (1 << 24) * Math.random() | 0;
        }

        if (this.config.color === 'auto') {
            return message.guild ? message.member.displayColor : 0;
        }

        return this.config.color || 0;
    }

    async start() {
        await this.login(this.config.token);
        Logger.info('Megumin ready! Explooooooosion!');
    }
}

module.exports = MeguminClient;
