const { Listener } = require('discord-akairo');

function exec(message, command, reason) {
    const reasons = {
        clientPermissions: `Missing permissions: ${command.clientPermissions}`
    };

    this.client.logger.logFrom(message.channel, 0, `(Command: ${command.id}, Blocked: ${reasons[reason]})`);
}

module.exports = new Listener('commandBlocked', exec, {
    emitter: 'commandHandler',
    eventName: 'commandBlocked',
    type: 'on'
});
