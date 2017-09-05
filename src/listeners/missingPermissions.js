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

    exec(message, command, type, missing) {
        Logger.log(`=> ${command.id} ~ ${missing.join(', ')}`);
        message.delete();
    }
}

module.exports = MissingPermissionsListener;
