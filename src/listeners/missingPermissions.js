const { Listener } = require('discord-akairo');
const Logger = require('../util/Logger');

class MissingPermissionsListener extends Listener {
    constructor() {
        super('missingPermissions', {
            emitter: 'commandHandler',
            event: 'missingPermissions',
            category: 'commandHandler'
        });
    }

    exec(message, command, reason) {
        const reasons = {
            clientPermissions: () => command.clientPermissions.join(', ')
        };

        if (reasons[reason]) {
            Logger.log(`=> ${command.id} ~ ${reasons[reason]()}`);
        }

        message.delete();
    }
}

module.exports = MissingPermissionsListener;
