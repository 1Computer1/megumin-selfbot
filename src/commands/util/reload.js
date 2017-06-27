const { Command } = require('discord-akairo');
const Logger = require('../../util/Logger');

class ReloadCommand extends Command {
    constructor() {
        super('reload', {
            aliases: ['reload'],
            category: 'util',
            args: [
                {
                    id: 'command',
                    type: 'commandAlias'
                }
            ]
        });
    }

    exec(message, { command }) {
        if (!command) {
            Logger.error('Unknown command.');
            return message.delete();
        }

        command.reload();
        Logger.info(`Command ${command.id} reload.`);
        return message.delete();
    }
}

module.exports = ReloadCommand;
