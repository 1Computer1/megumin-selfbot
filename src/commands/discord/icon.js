const { Command } = require('discord-akairo');
const Logger = require('../../util/Logger');

class IconCommand extends Command {
    constructor() {
        super('icon', {
            aliases: ['icon'],
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

        if (!guild.iconURL()) {
            Logger.error('Guild does not have an icon.');
            return message.delete();
        }

        const icon = guild.iconURL({ format: 'png', size: 2048 });
        const color = this.client.getColor(message);
        const embed = this.client.util.embed()
        .setColor(color)
        .setTitle('Guild Icon')
        .setURL(icon)
        .setImage(icon);

        return message.edit({ embed });
    }
}

module.exports = IconCommand;
