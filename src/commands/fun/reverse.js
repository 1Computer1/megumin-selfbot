const { Command } = require('discord-akairo');

class ReverseCommand extends Command {
    constructor() {
        super('reverse', {
            aliases: ['reverse'],
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
        return message.edit([...text].reverse().join(''));
    }
}

module.exports = ReverseCommand;
