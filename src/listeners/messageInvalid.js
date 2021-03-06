const { Listener } = require('discord-akairo');

class MessageInvalidListener extends Listener {
    constructor() {
        super('messageInvalid', {
            emitter: 'commandHandler',
            event: 'messageInvalid',
            category: 'commandHandler'
        });
    }

    editText(text) {
        const matches = [];
        const regex = /\\?\[(.+?)]/g;
        let temp;

        while ((temp = regex.exec(text)) !== null) {
            if (temp[0].startsWith('\\')) continue;
            matches.push(temp);
        }

        if (matches.length) {
            for (const [full, name] of matches) {
                const tag = this.client.tags[name.toLowerCase()];
                if (!tag) continue;

                text = text.replace(full, tag);
            }
        }

        if (!this.client.config.grammar) return text;

        const corrected = text
        .replace(/(?:^|[.?!]\s)\w/g, m => m.toUpperCase())
        .replace(/\b(i)(m)/gi, '$1\'$2')
        .replace(/\b(i)('m)?\b/gi, (m, i, a) => i.toUpperCase() + (a || ''))
        .replace(/\b(can|don|won|isn|wasn|aren|ain|shouldn|couldn|wouldn|didn|hadn|haven)(t)\b/gi, '$1\'$2')
        .replace(/\b(should|could|would|must|you)(ve)\b/gi, '$1\'$2')
        .replace(/\b(y)(all)\b/gi, '$1\'$2')
        .replace(/\b(that)(s)\b/gi, '$1\'$2');

        return corrected;
    }

    async exec(message) {
        if (message.editedTimestamp) return;

        if (/^\{.+?\}/.test(message.content)) {
            const name = message.content.match(/^\{(.+?)\}/);
            const image = this.client.images[name[1].toLowerCase()];

            if (!image) {
                const text = this.editText(message.content);
                if (message.content !== text) message.edit(text);
                return;
            }

            const color = this.client.getColor(message);
            const embed = this.client.util.embed().setImage(image).setColor(color);
            const text = this.editText(message.content.replace(name[0], ''));

            if (this.client.config.stickerImages) {
                await message.delete();
                message.channel.send(text, {
                    files: [image]
                });

                return;
            }

            message.edit(text, { embed });
            return;
        }

        const text = this.editText(message.content);
        if (message.content !== text) message.edit(text);
    }
}

module.exports = MessageInvalidListener;
