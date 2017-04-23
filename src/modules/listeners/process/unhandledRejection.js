const { Listener } = require('discord-akairo');
const Logger = require('../../../util/Logger');

function exec(err) {
    Logger.warn('An error occured. Contact someone who might know what it means.');
    Logger.error(err);
}

module.exports = new Listener('unhandledRejection', exec, {
    emitter: 'process',
    eventName: 'unhandledRejection',
    category: 'process'
});
