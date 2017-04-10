const { Command } = require('discord-akairo');

function exec(message, args) {
    const color = this.client.color(message);

    const embed = this.client.util.embed()
    .setColor(color)
    .setTitle('User Avatar')
    .setImage(args.user.displayAvatarURL.replace('.jpg?size=1024', '.png?size=1024'))
    .setURL(args.user.displayAvatarURL.replace('.jpg?size=1024', '.png?size=1024'));

    return message.edit({ embed });
}

module.exports = new Command('avatar', exec, {
    aliases: ['avatar'],
    args: [
        {
            id: 'user',
            type: 'user',
            default: m => m.author
        }
    ],
    category: 'info'
});
