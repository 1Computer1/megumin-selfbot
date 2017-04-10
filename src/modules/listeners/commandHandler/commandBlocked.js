const { Listener } = require('discord-akairo');

function exec(message, command, reason) {
    const reasons = {
        clientPermissions: `Missing permissions: ${command.clientPermissions}`
    };

    if (reasons[reason]) {
        this.client.logger.logFrom(message.channel, 0, `(Command: ${command.id}, Blocked: ${reasons[reason]})`);
    }

    message.delete();
}

module.exports = new Listener('commandBlocked', exec, {
    emitter: 'commandHandler',
    eventName: 'commandBlocked',
    type: 'on',
    category: 'commandHandler'
});
