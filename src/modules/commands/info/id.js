const { Command } = require('discord-akairo');

function exec(message, args){
    if (!message.guild) {
        this.client.logger.log(3, 'Mustbe in a guild to use this.');
        return message.delete();
    }

    if (!args.content) {
        this.client.logger.log(3, 'Must specify something to resolve.');
        return message.delete();
    }

    const member = this.client.util.resolveMember(args.content, message.guild.members, false, true);
    if (member) return message.edit(`\`${member.id}\``);

    const channel = this.client.util.resolveChannel(args.content, message.guild.channels, false, true);
    if (channel) return message.edit(`\`${channel.id}\``);

    const role = this.client.util.resolveRole(args.content, message.guild.roles, false, true);
    if (role) return message.edit(`\`${role.id}\``);
    
    const emoji = this.client.util.resolveEmoji(args.content, message.guild.emojis, false, true);
    if (emoji) return message.edit(`\`${emoji.id}\``);
    
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
    category: 'info'
});
