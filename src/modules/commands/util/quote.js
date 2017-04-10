const { Command } = require('discord-akairo');
const { URL } = require('url');
const path = require('path');

function exec(message, args) {
    if (!args.id) {
        this.client.logger.log(3, 'No message ID provided to quote.');
        return message.delete();
    }

    return args.channel.fetchMessages({ around: args.id, limit: 1 }).then(messages => {
        const quotee = messages.get(args.id);

        if (!quotee) {
            this.client.logger.log(3, 'Your message ID was invalid.');
            return message.delete();
        }

        const color = this.client.color(message);
        const embed = this.client.util.embed()
        .setDescription(quotee.content || '\u200B')
        .setAuthor(`${quotee.author.username}#${quotee.author.discriminator}`, quotee.author.displayAvatarURL)
        .setTimestamp(quotee.createdAt)
        .setColor(color);

        if (args.channel.id !== message.channel.id) embed.setFooter(`#${args.channel.name} in ${args.channel.guild ? args.channel.guild.name : 'DM'}`);

        let attachmentImage;
        const extensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
        const linkRegex = /https?:\/\/(?:\w+\.)?[\w-]+\.[\w]{2,3}(?:\/[\w-_\.]+)+\.(?:png|jpg|jpeg|gif|webp)/; // eslint-disable-line no-useless-escape

        if (quotee.attachments.some(attachment => {
            try {
                const url = new URL(attachment.url);
                const ext = path.extname(url.pathname);
                return extensions.includes(ext);
            } catch (err) {
                if (err.message !== 'Invalid URL') throw err;
                return false;
            }
        })) attachmentImage = quotee.attachments.first().url;

        if (!attachmentImage) {
            const linkMatch = quotee.content.match(linkRegex);
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

        if (attachmentImage) embed.setImage(attachmentImage);
        return message.edit(args.text, { embed });
    }).catch(err => {
        if (err.response && err.response.badRequest) {
            this.client.logger.log(3, 'Your message ID was invalid.');
            return message.delete();
        }

        throw err;
    });
}

module.exports = new Command('quote', exec, {
    aliases: ['quote', 'q'],
    args: [
        {
            id: 'id'
        },
        {
            id: 'text',
            match: 'rest'
        },
        {
            id: 'channel',
            type: function type(word) {
                if (!word) return null;
                const channel = this.client.channels.get(word);
                if (!channel || channel.type === 'voice') return null;
                return channel;
            },
            match: 'prefix',
            prefix: 'channel:',
            default: m => m.channel
        }
    ],
    clientPermissions: ['EMBED_LINKS'],
    category: 'util'
});
