const { Command } = require('discord-akairo');
const Logger = require('../../../util/Logger');

function exec(message, args) {
    if (!args.guild.iconURL) {
        Logger.warn('Guild does not have an icon.');
        return message.delete();
    }

    const color = this.client.color(message);
    const embed = this.client.util.embed()
    .setColor(color)
    .setTitle('Guild Icon')
    .setURL(args.guild.iconURL.replace('.jpg', '.png?size=1024'))
    .setImage(args.guild.iconURL.replace('.jpg', '.png?size=1024'));

    return message.edit({ embed });
}

module.exports = new Command('icon', exec, {
    aliases: ['icon'],
    args: [
        {
            id: 'guild',
            type: 'guild',
            default: m => m.guild || m.client.guilds.random()
        }
    ],
    clientPermissions: ['EMBED_LINKS'],
    category: 'info'
});
