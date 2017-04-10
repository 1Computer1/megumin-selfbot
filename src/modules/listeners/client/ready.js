const { Listener } = require('discord-akairo');

function exec() {
    this.client.logger.log(1, 'Client connected.');
}

module.exports = new Listener('ready', exec, {
    emitter: 'client',
    eventName: 'ready',
    type: 'on',
    category: 'client'
});
