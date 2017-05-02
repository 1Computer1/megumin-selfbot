const { Listener } = require('discord-akairo');
const Logger = require('../../../util/Logger');

function exec() {
    Logger.info('Client reconnecting.');
    if (this.client.config.exitOnDisconnect) process.exit();
}

module.exports = new Listener('reconnecting', exec, {
    emitter: 'client',
    eventName: 'reconnecting',
    category: 'client'
});
