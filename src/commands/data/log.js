const fs = require('fs');
const util = require('util');

const { Command } = require('discord-akairo');
const moment = require('moment');

const Logger = require('../../util/Logger');

const writeFile = util.promisify(fs.writeFile);
const mkdir = util.promisify(fs.mkdir);

class LogCommand extends Command {
    constructor() {
        super('log', {
            aliases: ['log', 'logs'],
            category: 'data',
            args: [
                {
                    id: 'channel',
                    type: word => {
                        const channel = this.client.util.resolveChannel(word, this.client.channels);
                        if (!channel || channel.type === 'voice') return null;
                        return channel;
                    },
                    match: 'prefix',
                    prefix: 'channel:',
                    default: m => m.channel
                },
                {
                    id: 'messages',
                    type: (word, message, { channel }) => {
                        return channel.messages.fetch({ limit: 100, before: word || undefined }).catch(() => null);
                    }
                }
            ]
        });
    }

    makeData(channel, messages) {
        return {
            location: {
                channel: channel.name || 'DM',
                channelID: channel.id,
                guild: channel.guild ? channel.guild.name : undefined,
                guildID: channel.guild ? channel.guild.id : undefined
            },
            messages: messages.map(m => ({
                id: m.id,
                author: m.author.tag,
                authorID: m.author.id,
                time: m.createdTimestamp,
                date: m.createdAt.toString(),
                content: m.content,
                attachment: m.attachments.size ? m.attachments.map(a => a.url) : undefined,
                embeds: m.embeds.length ? m.embeds.map(embed => ({
                    title: embed.title || undefined,
                    url: embed.url || undefined,
                    color: embed.color || undefined,
                    description: embed.description || undefined,
                    fields: embed.fields.length ? embed.fields.map(field => ({
                        name: field.name,
                        value: field.value
                    })) : undefined,
                    thumbnail: embed.thumbnail ? embed.thumbnail.url : undefined,
                    image: embed.image ? embed.image.url : undefined,
                    footer: embed.footer ? embed.footer.text : undefined
                })) : undefined
            }))
        };
    }

    async exec(message, { channel, messages }) {
        if (!messages) {
            Logger.error('Messages could not be fetched.');
            return message.delete();
        }

        const data = this.makeData(channel, messages);
        const filename = `./src/data/logs/log_${moment(message.createdTimestamp).format('YYYY-MM-DD_HH-mm-ss')}.json`;

        await mkdir('./src/data/logs/').catch(() => null);
        await writeFile(filename, JSON.stringify(data, null, 4));

        Logger.info(`Saved messages to ${filename}.`);
        return message.delete();
    }
}

module.exports = LogCommand;
