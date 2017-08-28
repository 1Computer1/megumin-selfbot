const { Command } = require('discord-akairo');

class AvatarCommand extends Command {
    constructor() {
        super('avatar', {
            aliases: ['avatar'],
            category: 'discord',
            clientPermissions: ['EMBED_LINKS'],
            args: [
                {
                    id: 'user',
                    type: 'relevant',
                    default: m => m.author
                }
            ]
        });
    }

    exec(message, { user }) {
        const avatar = user.displayAvatarURL;
        const color = this.client.getColor(message);
        const embed = this.client.util.embed()
        .setColor(color)
        .setTitle('User Avatar')
        .setURL(avatar)
        .setImage(avatar);

        return message.edit({ embed });
    }
}

module.exports = AvatarCommand;
