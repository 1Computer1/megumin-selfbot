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
        .setAuthor(`${quotee.author.username}#${quotee.author.discriminator}`, quotee.author.displayAvatarURL);

        return message.edit(message.content.slice(message.content.search(args.id) + args.id.length + 1), { embed });
    }).catch(err => {
        if (err.response && err.response.badRequest) return this.framework.logger.log(3, 'Your message ID was invalid.');
        throw err;
    });
}

module.exports = new Command('quote', exec, {
    aliases: ['quote'],
    args: [
        {
            id: 'id'
        }
    ]
});