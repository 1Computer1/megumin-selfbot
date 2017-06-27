const { Command } = require('discord-akairo');

class ColorCommand extends Command {
    constructor() {
        super('color', {
            aliases: ['color', 'colour'],
            category: 'info',
            clientPermissions: ['EMBED_LINKS'],
            args: [
                {
                    id: 'text',
                    match: 'content',
                    default: () => (1 << 24) * Math.random() | 0
                }
            ]
        });
    }

    exec(message, { text }) {
        text = isNaN(text) ? text : parseInt(text);
        const embed = this.client.util.embed().setColor(text);

        let hex = isNaN(embed.color) ? '0' : embed.color.toString(16);
        hex = `#${'0'.repeat(6 - hex.length)}${hex}`;
        embed.setTitle(hex.toUpperCase());

        return message.edit({ embed });
    }
}

module.exports = ColorCommand;
