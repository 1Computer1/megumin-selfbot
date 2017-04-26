const { Command } = require('discord-akairo');
const { FlippedCharacters } = require('../../../util/Constants');

function exec(message, args) {
    const flipped = [];
    for (const c of args.content) {
        flipped.push(FlippedCharacters[c] || c);
    }

    return message.edit(flipped.reverse().join(''));
}

module.exports = new Command('flip', exec, {
    aliases: ['flip'],
    args: [
        {
            id: 'content',
            match: 'content'
        }
    ],
    category: 'fun'
});
