const { Command } = require('discord-akairo');
const Logger = require('../../util/Logger');

class StatusCommand extends Command {
    constructor() {
        super('status', {
            aliases: ['status'],
            category: 'util',
            args: [
                {
                    id: 'status',
                    type: ['online', 'idle', 'dnd', 'invisible'],
                    default: 'online'
                }
            ]
        });
    }

    async exec(message, args) {
        await this.client.user.setStatus(args.status);
        Logger.info(`Status set to "${this.client.user.presence.status}"`);
        return message.delete();
    }
}

module.exports = StatusCommand;
