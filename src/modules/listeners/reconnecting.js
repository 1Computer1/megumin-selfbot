const { Listener } = require('discord-akairo');

function exec(){
    this.framework.logger.log(1, 'Client reconnecting.');
}

module.exports = new Listener('reconnecting', exec, {
    emitter: 'client',
    eventName: 'reconnecting',
    type: 'on'
});
