const { Listener } = require('discord-akairo');

function exec(close){
    this.client.logger.log(1, `Client disconnected with code ${close.code}.`);
    if (this.client.config.exitOnDisconnect) return process.exit();
    return;
}

module.exports = new Listener('disconnect', exec, {
    emitter: 'client',
    eventName: 'disconnect',
    type: 'on'
});
