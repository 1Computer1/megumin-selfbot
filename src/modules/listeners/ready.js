const { Listener } = require('discord-akairo');

function exec(){
    return this.client.logger.log(1, 'Client connected.');
}

module.exports = new Listener('ready', exec, {
    emitter: 'client',
    eventName: 'ready',
    type: 'on'
});
