const path = require('path');
const { URL } = require('url');

const { Command } = require('discord-akairo');
const Logger = require('../../util/Logger');

class QuoteCommand extends Command {
    constructor() {
        super('quote', {
            aliases: ['quote', 'q'],
            category: 'util',
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
                        return channel.fetchMessage(word).catch(() => Promise.reject());
                    }
                },
                {
                    id: 'text',
                    match: 'rest'
                }
            ]
        });
    }

    findAttachment(message) {
        let attachmentImage;
        const extensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
        const linkRegex = /https?:\/\/(?:\w+\.)?[\w-]+\.[\w]{2,3}(?:\/[\w-_.]+)+\.(?:png|jpg|jpeg|gif|webp)/;

        if (message.attachments.some(attachment => {
            try {
                const url = new URL(attachment.url);
                const ext = path.extname(url.pathname);
                return extensions.includes(ext);
            } catch (err) {
                if (err.message !== 'Invalid URL') throw err;
                return false;
            }
        })) attachmentImage = message.attachments.first().url;

        if (!attachmentImage) {
            const linkMatch = message.content.match(linkRegex);
            if (linkMatch) {
                try {
                    const url = new URL(linkMatch[0]);
                    const ext = path.extname(url.pathname);
                    if (extensions.includes(ext)) attachmentImage = linkMatch[0];
                } catch (err) {
                    if (err.message !== 'Invalid URL') throw err;
                }
            }
        }

        return attachmentImage;
    }

    exec(message, { message: msg, text }) {
        if (!message) {
            Logger.error('The message could not be found.');
            return message.delete();
        }

        if (!msg) {
            Logger.error('Your message ID was invalid.');
            return message.delete();
        }

        const color = this.client.getColor(message);
        const embed = this.client.util.embed()
        .setColor(color)
        .setAuthor(`${msg.author.tag}`, msg.author.displayAvatarURL())
        .setDescription(msg.content || '\u200B')
        .setTimestamp(msg.createdAt);

        if (msg.channel.id !== message.channel.id) embed.setFooter(`#${msg.channel.name} in ${msg.channel.guild ? msg.channel.guild.name : 'DM'}`);

        const attachment = this.findAttachment(msg);
        if (attachment) embed.setImage(attachment);
        return message.edit(text, { embed });
    }
}

module.exports = QuoteCommand;
