const { Command } = require('discord-akairo');
const Logger = require('../../util/Logger');

class IDCommand extends Command {
    constructor() {
        super('id', {
            aliases: ['id'],
            category: 'discord',
            channelRestriction: 'guild',
            args: [
                {
                    id: 'text',
                    match: 'content'
                }
            ]
        });
    }

    exec(message, { text }) {
        if (!text) {
            Logger.error('Must specify something to resolve.');
            return message.delete();
        }

        const resolved = [];

        const member = this.client.util.resolveMember(text, message.guild.members);
        if (member) resolved.push(`@${member.user.username}#${member.user.discriminator} = \`${member.id}\``);

        const channel = this.client.util.resolveChannel(text, message.guild.channels);
        if (channel) resolved.push(`#${channel.name} = \`${channel.id}\``);

        const role = this.client.util.resolveRole(text, message.guild.roles);
        if (role) resolved.push(`@${role.name} = \`${role.id}\``);

        const emoji = this.client.util.resolveEmoji(text, message.guild.emojis);
        if (emoji) resolved.push(`${emoji} = \`${emoji.id}\``);

        if (!resolved.length) {
            Logger.error('Could not resolve anything from the text.');
            return message.delete();
        }

        return message.edit(resolved);
    }
}

module.exports = IDCommand;
