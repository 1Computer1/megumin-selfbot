const { Listener } = require('discord-akairo');
const Logger = require('../util/Logger');

class CommandBlockedListener extends Listener {
    constructor() {
        super('commandBlocked', {
            emitter: 'commandHandler',
            eventName: 'commandBlocked',
            category: 'commandHandler'
        });
    }

    exec(message, command, reason) {
        const reasons = {
            clientPermissions: () => command.clientPermissions.join(', '),
            guild: () => 'Guild Only'
        };

        if (reasons[reason]) {
            Logger.log(`=> ${command.id} ~ ${reasons[reason]()}`);
        }

        message.delete();
    }
}

module.exports = CommandBlockedListener;
