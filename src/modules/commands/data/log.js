const { Command } = require('discord-akairo');
const moment = require('moment');
const FileSystem = require('../../../util/FileSystem');
const Logger = require('../../../util/Logger');

function exec(message, args) {
    return FileSystem.mkdir('./src/data/logs/').then(() => {
        return args.channel.fetchMessages({ limit: 100, before: args.before || undefined });
    }).then(messages => {
        const object = {
            location: {
                channel: args.channel.name || 'DM',
                channelID: args.channel.id,
                guild: args.channel.guild ? args.channel.guild.name : undefined,
                guildID: args.channel.guild ? args.channel.guild.id : undefined
            },
            messages: messages.map(m => {
                return {
                    id: m.id,
                    author: m.author.username,
                    authorID: m.author.id,
                    time: m.createdTimestamp,
                    date: m.createdAt.toString(),
                    content: m.cleanContent,
                    attachment: m.attachments.size ? m.attachments.first().url : undefined,
                    embeds: m.embeds.length ? m.embeds.map(embed => {
                        return {
                            title: embed.title || undefined,
                            url: embed.url || undefined,
                            color: embed.color || undefined,
                            description: embed.description || undefined,
                            fields: embed.fields.length ? embed.fields.map(field => {
                                return {
                                    name: field.name,
                                    value: field.value
                                };
                            }) : undefined,
                            thumbnail: (embed.thumbnail && embed.thumbnail.url) || undefined,
                            image: (embed.image && embed.image.url) || undefined,
                            footer: (embed.footer && embed.footer.text) || undefined
                        };
                    }) : undefined
                };
            })
        };

        const filename = `./src/data/logs/log_${moment(message.createdTimestamp).format('YYYY-MM-DD_HH-mm-ss')}.json`;
        return FileSystem.writeFile(filename, JSON.stringify(object, null, '\t')).then(() => {
            Logger.debug(`Saved messages to ${filename}.`);
            return message.delete();
        });
    });
}

module.exports = new Command('log', exec, {
    aliases: ['log', 'logs'],
    args: [
        {
            id: 'before'
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
    category: 'data'
});
