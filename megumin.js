const { AkairoClient } = require('discord-akairo');

const config = require('./src/data/config.json');

const client = new AkairoClient({
    prefix: config.prefix,
    allowMention: false,
    handleEdits: true,
    commandUtil: false,
    selfbot: true,
    commandDirectory: './src/modules/commands',
    listenerDirectory: './src/modules/listeners'
}, {
    maxMessageCache: config.cache == null ? 50 : config.cache,
    disableEveryone: true,
    disabledEvents: [
        'TYPING_START',
        'MESSAGE_DELETE',
        'GUILD_MEMBER_UPDATE',
        'PRESENCE_UPDATE',
        config.cache === 0 ? 'MESSAGE_UPDATE' : ''
    ]
});

const Logger = require('./src/util/Logger');

Object.assign(client, {
    config,
    logger: new Logger(config.noLogs),
    tags: require('./src/data/tags.json'),
    images: require('./src/data/images.json'),
    color: message => {
        if (config.color === 'random') return (1 << 24) * Math.random() | 0;

        if (config.color === 'auto') {
            return message.guild ? client.util.displayColor(message.member) : 0;
        }

        return client.config.color || 0;
    }
});

client.login(config.token).then(() => {
    client.logger.log(1, 'Megumin ready! Explooooooosion!');
});

process.on('unhandledRejection', err => {
    client.logger.log(3, 'An error occured. Contact someone who might know what it means.');
    console.error(err); // eslint-disable-line no-console
});
