const { Command } = require('discord-akairo');

function exec(message){
    return message.edit('Pong!').then(m => {
        const diff = m.editedAt - m.createdAt;
        return m.edit(`Pong! (${diff} ms)`);
    });
}

module.exports = new Command('ping', exec, {
    aliases: ['ping'],
    args: []
});
