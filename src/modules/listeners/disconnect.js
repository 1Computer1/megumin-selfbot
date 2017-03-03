const { Listener } = require('discord-akairo');

function exec(close){
    return this.client.logger.log(1, `Client disconnected with code ${close.code}.`);
}

module.exports = new Listener('disconnect', exec, {
    emitter: 'client',
    eventName: 'disconnect',
    type: 'on'
});
