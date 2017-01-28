const { Command } = require('discord-akairo');

function exec(message, args){
    return this.client.user.setStatus(args.status).then(() => {
        this.framework.logger.log(1, `Status set to "${this.client.user.presence.status}"`);
        return message.delete();
    });
}

module.exports = new Command('status', exec, {
    aliases: ['status'],
    args: [
        {
            id: 'status',
            type: ['online', 'idle', 'dnd', 'invisible'],
            defaultValue: 'online'
        }
    ]
});
