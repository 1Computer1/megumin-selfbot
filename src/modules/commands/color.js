const { Command } = require('discord-akairo');
const { RichEmbed } = require('discord.js');

function exec(message, args){
    args.content = isNaN(args.content) ? args.content : parseInt(args.content);
    const embed = new RichEmbed().setColor(args.content);

    let hex = isNaN(embed.color) ? '0' : embed.color.toString(16);
    hex = '#' + '0'.repeat(6 - hex.length) + hex;
    embed.setTitle(hex.toUpperCase());

    return message.edit('', { embed });
}

module.exports = new Command('color', exec, {
    aliases: ['color', 'colour'],
    args: [
        {
            id: 'content',
            match: 'content',
            defaultValue: () => (1 << 24) * Math.random() | 0
        }
    ]
});
