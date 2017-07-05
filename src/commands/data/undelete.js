const { Command } = require('discord-akairo');
const { RichEmbed } = require('discord.js');

function exec(message, args) {
    if (args.channel === '0') {
        args.channel = message.channel.id;
    }
    if (!this.client.deleteCache[args.channel]) return;

    const delMessage = this.client.deleteCache[args.channel][args.entry];
    if (!delMessage) {
        message.edit(`Undelete cache currently at ${this.client.deleteCache[args.channel].length}`);
    }
    const channel = this.client.channels.get(args.channel);

    const embed = new RichEmbed()
    .addField('Message Author', delMessage.author ? delMessage.author : 'No author recorded', true)
    .addField('Contents', delMessage.content ? delMessage.content : 'No content Recorded', true)
    .setFooter(`In channel ${channel.name} of server ${channel.guild.name}`);
    message.edit({ embed });
}

module.exports = new Command('undelete', exec, {
    aliases: ['undelete'],
    args: [
        {
            id: 'entry',
            default: '0'
        },
        {
            id: 'channel',
            default: '0'
        }
    ],
    category: 'data'
});
