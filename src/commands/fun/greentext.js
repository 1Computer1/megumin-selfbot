const { Command } = require('discord-akairo');

class GreentextCommand extends Command {
    constructor() {
        super('greentext', {
            aliases: ['greentext', 'green'],
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
        return message.edit(`>${text.replace(/\n/g, '\n>')}`, { code: 'css' });
    }
}

module.exports = GreentextCommand;
