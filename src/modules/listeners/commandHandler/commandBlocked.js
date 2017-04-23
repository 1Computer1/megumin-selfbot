const { Listener } = require('discord-akairo');
const Logger = require('../../../util/Logger');

function exec(message, command, reason) {
    const reasons = {
        clientPermissions: () => command.clientPermissions.join(', '),
        guild: () => 'Guild Only'
    };

    if (reasons[reason]) {
        Logger.log(`=> ${command.id} ~ ${reasons[reason]()}`);
    }

    message.delete();
}

module.exports = new Listener('commandBlocked', exec, {
    emitter: 'commandHandler',
    eventName: 'commandBlocked',
    category: 'commandHandler'
});
