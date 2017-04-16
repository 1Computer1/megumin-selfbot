const { Listener } = require('discord-akairo');
const Logger = require('../../../util/Logger');

function exec(message, command) {
    Logger.log(`=> ${command.id}`);
}

module.exports = new Listener('commandStarted', exec, {
    emitter: 'commandHandler',
    eventName: 'commandStarted',
    type: 'on',
    category: 'commandHandler'
});
