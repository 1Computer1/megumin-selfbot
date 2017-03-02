const { Command } = require('discord-akairo');
const moment = require('moment');
const fs = require('fs');

function exec(message, args){
    try {
        fs.mkdirSync('./src/data/logs/');
    } catch (err) {
        if (err.code !== 'EEXIST') throw err;
    }

    return message.channel.fetchMessages({ limit: 100, before: args.before || undefined }).then(messages => {
        const object = {
            location: {
                channel: message.channel.name || 'DM',
                channelID: message.channel.id,
                guild: message.guild ? message.guild.name : undefined,
                guildID: message.guild ? message.guild.id : undefined
            },
            messages: messages.map(m => {
                return {
                    id: m.id,
                    author: m.author.username,
                    authorID: m.author.id,
                    time: m.createdTimestamp,
                    date: m.createdAt.toString(),
                    content: m.cleanContent,
                    attachment: m.attachments.size ? m.attachments.first().url : undefined
                };
            })
        };

        const filename = `./src/data/logs/log_${moment(message.createdTimestamp).format('YYYY-MM-DD_HH-mm-ss')}.json`;
        fs.writeFileSync(filename, JSON.stringify(object, null, '\t'));

        this.client.logger.log(2, `Saved messages to ${filename}.`);
        return message.delete();
    });
}

module.exports = new Command('log', exec, {
    aliases: ['log', 'logs'],
    args: [
        {
            id: 'before'
        }
    ],
    category: 'data'
});
