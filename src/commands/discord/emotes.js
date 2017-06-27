const { Command } = require('discord-akairo');
const Logger = require('../../util/Logger');

class EmotesCommand extends Command {
    constructor() {
        super('emotes', {
            aliases: ['emotes', 'emojis'],
            category: 'discord',
            clientPermissions: ['EMBED_LINKS'],
            args: [
                {
                    id: 'guild',
                    type: 'guild',
                    default: m => m.guild
                }
            ]
        });
    }

    exec(message, { guild }) {
        if (!guild) {
            Logger.error('No guild provided.');
            return message.delete();
        }

        if (!guild.emojis.size) {
            Logger.error('This guild does not have any emotes.');
            return message.delete();
        }

        const color = this.client.getColor(message);
        const embed = this.client.util.embed()
        .setColor(color)
        .setTitle('Emotes');

        const emotes = guild.emojis;
        const sections = [];
        let temp = [];

        for (const emote of emotes.values()) {
            if (temp.join(' ').length + emote.toString().length + 1 > 1020) {
                sections.push(temp);
                temp = [];
            }

            temp.push(emote.toString());
        }

        sections.push(temp);

        for (const section of sections) {
            embed.addField('\u200B', section.join(' '), true);
        }

        return message.edit({ embed });
    }
}

module.exports = EmotesCommand;
