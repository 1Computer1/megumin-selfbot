const { Command } = require('discord-akairo');
const Logger = require('../../../util/Logger');

function exec(message, args) {
    return this.client.user.setStatus(args.status).then(() => {
        Logger.info(`Status set to "${this.client.user.presence.status}"`);
        return message.delete();
    });
}

module.exports = new Command('status', exec, {
    aliases: ['status'],
    args: [
        {
            id: 'status',
            type: ['online', 'idle', 'dnd', 'invisible'],
            default: 'online'
        }
    ],
    category: 'util'
});
