const { Command } = require('discord-akairo');

class OrangetextCommand extends Command {
    constructor() {
        super('orangetext', {
            aliases: ['orangetext', 'orange'],
            category: 'fun',
            args: [
                {
                    id: 'text',
                    match: 'content',
                    default: '\u200B'
                }
            ]
        });
    }

    exec(message, { text }) {
        return message.edit(`${text.replace(/\n/g, '<\n')}<`, { code: 'fix' });
    }
}

module.exports = OrangetextCommand;
