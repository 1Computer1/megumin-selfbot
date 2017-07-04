// Temporary
const Discord = require('discord.js');
Discord.RichEmbed = Discord.MessageEmbed;

const MeguminClient = require('./src/struct/MeguminClient');
const Logger = require('./src/util/Logger');

const config = require('./config.json');
const client = new MeguminClient(config);
client.build();

client.on('ready', () => {
    Logger.info('Megumin connected.');
});

client.on('disconnect', close => {
    Logger.info(`Megumin disconnected with code ${close.code}.`);
    if (config.exitOnDisconnect) process.exit();
});

client.on('reconnecting', () => {
    Logger.info('Megumin reconnecting.');
    if (config.exitOnDisconnect) process.exit();
});

client.commandHandler.on('commandStarted', (message, command) => {
    Logger.log(`=> ${command.id}`);
});

client.commandHandler.on('error', err => {
    Logger.error('An error occured.');
    Logger.stacktrace(err);
    if (config.exitOnDisconnect) process.exit();
});

client.start();

process.on('unhandledRejection', err => {
    Logger.error('An error occured.');
    Logger.stacktrace(err);
    if (config.exitOnDisconnect) process.exit();
});
