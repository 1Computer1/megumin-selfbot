const { Listener } = require('discord-akairo');
const Logger = require('../../../util/Logger');

function exec(close) {
    Logger.info(`Client disconnected with code ${close.code}.`);
    if (this.client.config.exitOnDisconnect) process.exit();
}

module.exports = new Listener('disconnect', exec, {
    emitter: 'client',
    eventName: 'disconnect',
    category: 'client'
});
