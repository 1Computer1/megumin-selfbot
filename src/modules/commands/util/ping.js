const { Command } = require('discord-akairo');

function exec(message) {
    return message.edit('🏓\u2000Pong!').then(m => {
        const diff = m.editedAt - m.createdAt;
        return m.edit(`🏓\u2000Pong! (${diff} ms)`);
    });
}

module.exports = new Command('ping', exec, {
    aliases: ['ping'],
    category: 'util'
});
