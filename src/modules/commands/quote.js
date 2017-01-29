const { Command } = require('discord-akairo');
const { RichEmbed } = require('discord.js');

function exec(message, args){
    if (!args.id){
        this.framework.logger.log(3, 'No message ID provided to quote.');
        return message.delete();
    }

    return message.channel.fetchMessages({ around: args.id, limit: 3 }).then(messages => {
        const quotee = messages.get(args.id);
        const embed = new RichEmbed()
        .setDescription(quotee.content || '\u200B')
        .setAuthor(`${quotee.author.username}#${quotee.author.discriminator}`, quotee.author.displayAvatarURL)
        .setTimestamp(quotee.createdAt)
        .setColor(this.framework.config.color === 'auto' && message.guild ? this.client.util.displayColor(message.member) : this.framework.config.color || 0);

        if (quotee.attachments.size) embed.setThumbnail(quotee.attachments.first().url);

        return message.edit(message.content.slice(message.content.search(args.id) + args.id.length + 1), { embed });
    }).catch(err => {
        if (err.response && err.response.badRequest){
            this.framework.logger.log(3, 'Your message ID was invalid.');
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
        }
    ]
});