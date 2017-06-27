const { Command } = require('discord-akairo');

class EmbedCommand extends Command {
    constructor() {
        super('embed', {
            aliases: ['embed'],
            category: 'fun',
            clientPermissions: ['EMBED_LINKS'],
            args: [
                {
                    id: 'text',
                    match: 'content'
                }
            ]
        });
    }

    exec(message, { text }) {
        const messageInvalid = this.client.listenerHandler.modules.get('messageInvalid');

        const color = this.client.getColor(message);
        const embed = this.client.util.embed()
        .setColor(color)
        .setDescription(messageInvalid.editText(text));

        return message.edit({ embed });
    }
}

module.exports = EmbedCommand;
