const { Command } = require('discord-akairo');
const Logger = require('../../../util/Logger');

function exec(message, args) {
    if (!args.guild.emojis.size) {
        Logger.warn('This guild does not have any emotes.');
        return message.delete();
    }

    const color = this.client.color(message);
    const embed = this.client.util.embed()
    .setColor(color)
    .setTitle('Emotes');

    const emotes = args.guild.emojis;
    const sections = [];
    let temp = [];

    for (const emote of emotes.values()) {
        if (temp.join(' ').length + emote.toString().length + 1 > 1020) {
            sections.push(temp);
            temp = [];
        }

        temp.push(emote.toString());
    }

    sections.push(temp);

    for (const section of sections) {
        embed.addField('\u200B', section.join(' '), true);
    }

    return message.edit({ embed });
}

module.exports = new Command('emotes', exec, {
    aliases: ['emotes', 'emojis'],
    args: [
        {
            id: 'guild',
            type: 'guild',
            default: m => m.guild || m.client.guilds.random()
        }
    ],
    clientPermissions: ['EMBED_LINKS'],
    category: 'info'
});
