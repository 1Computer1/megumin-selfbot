const { Listener } = require('discord-akairo');

function exec(message, command, reason) {
    const reasons = {
        clientPermissions: () => {
            return command.clientPermissions.join(', ');
        }
    };

    if (reasons[reason]) {
        this.client.logger.logFrom(message.channel, 0, `=> ${command.id} ~ ${reasons[reason]()}`);
    }

    message.delete();
}

module.exports = new Listener('commandBlocked', exec, {
    emitter: 'commandHandler',
    eventName: 'commandBlocked',
    type: 'on',
    category: 'commandHandler'
});
