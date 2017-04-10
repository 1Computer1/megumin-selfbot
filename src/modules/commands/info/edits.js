const { Command } = require('discord-akairo');

function exec(message, args) {
    if (!args.id) {
        this.client.logger.log(3, 'No message ID provided to see edits.');
        return message.delete();
    }

    const quotee = args.channel.messages.get(args.id);

    if (!quotee) {
        this.client.logger.log(3, 'Your message ID was invalid or the message is not cached.');
        return message.delete();
    }

    const color = this.client.color(message);
    const embed = this.client.util.embed()
    .setColor(color)
    .setAuthor(`${quotee.author.username}#${quotee.author.discriminator}`, quotee.author.displayAvatarURL)
    .setFooter(`${quotee.id} | Edit History`);

    for (const [i, edit] of quotee.edits.entries()) {
        embed.addField(i === 0 ? 'Latest' : i === quotee.edits.length - 1 ? 'Original' : `Edit ${quotee.edits.length - i - 1}`, edit.content);
    }

    return message.edit(message.content.slice(message.content.search(args.id) + args.id.length + 1), { embed });
}

module.exports = new Command('edits', exec, {
    aliases: ['edits'],
    args: [
        {
            id: 'id'
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
    category: 'info'
});
