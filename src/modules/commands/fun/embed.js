const { Command } = require('discord-akairo');

function exec(message, args) {
    const { editText } = this.client.listenerHandler.modules.get('messageInvalid');

    const color = this.client.color(message);
    const embed = this.client.util.embed()
    .setColor(color)
    .setDescription(editText.call(this, args.content));

    return message.edit({ embed });
}

module.exports = new Command('embed', exec, {
    aliases: ['embed'],
    args: [
        {
            id: 'content',
            match: 'content'
        }
    ],
    clientPermissions: ['EMBED_LINKS'],
    category: 'fun'
});
