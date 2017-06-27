const { Command } = require('discord-akairo');
const { FlippedCharacters } = require('../../util/Constants');

class FlipCommand extends Command {
    constructor() {
        super('flip', {
            aliases: ['flip'],
            category: 'fun',
            args: [
                {
                    id: 'text',
                    match: 'content'
                }
            ]
        });
    }

    exec(message, { text }) {
        const flipped = [];
        for (const c of text) {
            flipped.push(FlippedCharacters[c] || c);
        }

        return message.edit(flipped.reverse().join(''));
    }
}

module.exports = FlipCommand;
