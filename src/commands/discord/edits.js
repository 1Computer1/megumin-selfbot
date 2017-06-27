const { Command } = require('discord-akairo');
const Logger = require('../../util/Logger');

class EditsCommand extends Command {
    constructor() {
        super('edits', {
            aliases: ['edits'],
            category: 'discord',
            clientPermissions: ['EMBED_LINKS'],
            args: [
                {
                    id: 'channel',
                    type: word => {
                        const channel = this.client.channels.get(word);
                        if (!channel || channel.type === 'voice') return null;
                        return channel;
                    },
                    match: 'prefix',
                    prefix: 'channel:',
                    default: m => m.channel
                },
                {
                    id: 'message',
                    type: (word, message, { channel }) => {
                        return channel.messages.get(word);
                    }
                },
                {
                    id: 'text',
                    match: 'rest'
                }
            ]
        });
    }

    exec(message, { message: msg, text }) {
        if (!msg) {
            Logger.error('The message could not be found (invalid or not cached).');
            return message.delete();
        }

        const color = this.client.getColor(message);
        const embed = this.client.util.embed()
        .setColor(color)
        .setAuthor(msg.author.tag, msg.author.displayAvatarURL());

        if (msg.channel.id !== message.channel.id) {
            embed.setFooter(`#${msg.channel.name} in ${msg.channel.guild ? msg.channel.guild.name : 'DM'} | Edit History`);
        } else {
            embed.setFooter('Edit History');
        }

        for (const [i, edit] of msg.edits.entries()) {
            embed.addField(i === 0 ? 'Latest' : i === msg.edits.length - 1 ? 'Original' : `Edit ${msg.edits.length - i - 1}`, edit.content);
        }

        return message.edit(text, { embed });
    }
}

module.exports = EditsCommand;
