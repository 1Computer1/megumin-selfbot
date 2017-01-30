const { Client } = require('discord.js');
const { Framework } = require('discord-akairo');

const config = require('./src/data/config.json');

const client = new Client({
    maxMessageCache: 0,
    disableEveryone: true,
    disabledEvents: ['TYPING_START', 'TYPING_END', 'MESSAGE_UPDATE', 'MESSAGE_DELETE', 'GUILD_MEMBER_UPDATE', 'PRESENCE_UPDATE'],
});

const framework = new Framework(client, {
    prefix: config.prefix,
    allowMention: false,
    selfbot: true,
    ownerID: config.ownerID,
    commandDirectory: './src/modules/commands',
    listenerDirectory: './src/modules/listeners'
});

const Logger = require('./src/struct/Logger');
framework.logger = new Logger(framework, config.noLogs);

framework.tags = require('./src/data/tags.json');
framework.images = require('./src/data/images.json');
framework.config = config;

framework.login(config.token).then(() => {
    framework.logger.log(1, 'Megumin ready! Explooooooosion!');
}).catch(console.error);

process.on('unhandledRejection', err => {
    framework.logger.log(3, 'An error occured. Contact someone who might know what it means.');
    console.error(err);
});
