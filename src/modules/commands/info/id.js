const { Command } = require('discord-akairo');

function exec(message, args) {
    if (!args.content) {
        this.client.logger.log(3, 'Must specify something to resolve.');
        return message.delete();
    }

    const member = this.client.util.resolveMember(args.content, message.guild.members);
    if (member) return message.edit(`@${member.user.username}#${member.user.discriminator} = \`${member.id}\``);

    const channel = this.client.util.resolveChannel(args.content, message.guild.channels);
    if (channel) return message.edit(`#${channel.name} = \`${channel.id}\``);

    const role = this.client.util.resolveRole(args.content, message.guild.roles);
    if (role) return message.edit(`@${role.name} = \`${role.id}\``);

    const emoji = this.client.util.resolveEmoji(args.content, message.guild.emojis);
    if (emoji) return message.edit(`${emoji} = \`${emoji.id}\``);

    this.client.logger.log(3, 'Could not resolve anything from the content.');
    return message.delete();
}

module.exports = new Command('id', exec, {
    aliases: ['id'],
    args: [
        {
            id: 'content',
            match: 'content'
        }
    ],
    channelRestriction: 'guild',
    category: 'info'
});
