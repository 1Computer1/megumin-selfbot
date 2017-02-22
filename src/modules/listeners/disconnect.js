const { Listener } = require('discord-akairo');

function exec(){
    return this.client.logger.log(1, 'Client disconnected.');
}

module.exports = new Listener('disconnect', exec, {
    emitter: 'client',
    eventName: 'disconnect',
    type: 'on'
});
