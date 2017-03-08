const { Command } = require('discord-akairo');

function exec(message, args){
    const color = this.client.color(message);

    const embed = this.client.util.embed()
    .setColor(color)
    .setImage(args.user.displayAvatarURL)
    .setTitle('User Avatar')
    .setURL(args.user.displayAvatarURL);

    return message.edit('', { embed });
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
