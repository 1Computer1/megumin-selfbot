const { AkairoClient } = require('discord-akairo');

const config = require('./src/data/config.json');

const client = new AkairoClient({
    prefix: config.prefix,
    allowMention: false,
    selfbot: true,
    ownerID: config.ownerID,
    commandDirectory: './src/modules/commands',
    listenerDirectory: './src/modules/listeners',
}, {
    maxMessageCache: 0,
    disableEveryone: true,
    disabledEvents: ['TYPING_START', 'TYPING_END', 'MESSAGE_UPDATE', 'MESSAGE_DELETE', 'GUILD_MEMBER_UPDATE', 'PRESENCE_UPDATE']
});

const Logger = require('./src/struct/Logger');
client.logger = new Logger(config.noLogs);

client.tags = require('./src/data/tags.json');
client.images = require('./src/data/images.json');
client.config = config;

client.login(config.token).then(() => {
    client.logger.log(1, 'Megumin ready! Explooooooosion!');
}).catch(err => {
    client.logger.log(3, 'Could not login. Is your token correct?');
    console.error(err);
});

process.on('unhandledRejection', err => {
    client.logger.log(3, 'An error occured. Contact someone who might know what it means.');
    console.error(err);
});
