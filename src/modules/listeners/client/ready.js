const { Listener } = require('discord-akairo');
const Logger = require('../../../util/Logger');

function exec() {
    Logger.info('Client connected.');
}

module.exports = new Listener('ready', exec, {
    emitter: 'client',
    eventName: 'ready',
    type: 'on',
    category: 'client'
});
