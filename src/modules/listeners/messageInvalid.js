const { Listener } = require('discord-akairo');
const { RichEmbed } = require('discord.js');

function editText(client, text){
    const matched = text.match(/\[.+?\]/g);

    if (matched) for (const word of matched){
        if (!/\[.+?\]/.test(word)) continue;

        const tag = client.tags[word.slice(1, -1).toLowerCase()];
        if (!tag) continue;

        text = text.replace(word, tag);
    }

    if (!client.config.grammar) return text;
    if (client.config.grammar){
        const corrected = text
        .replace(/(?:^|[.?!]\s)\w/g, m => m.toUpperCase())
        .replace(/(\bi)('?m?\b)/gi, (m, i, a) => i.toUpperCase() + a)
        .replace(/\b(can|don|won|isn|wasn|aren|ain|shouldn|couldn|wouldn|didn|hadn|haven)(t)\b/gi, '$1\'$2')
        .replace(/\b(should|could|would|must|you)(ve)\b/gi, '$1\'$2')
        .replace(/\b(y)(all)\b/gi, '$1\'$2')
        .replace(/\b(that)(s)\b/gi, '$1\'$2');

        return corrected;
    }
}

function exec(message){
    if (/^\{.+?\}/.test(message.content)){
        const name = message.content.match(/^\{(.+?)\}/);
        const image = this.client.images[name[1].toLowerCase()];

        if (!image){
            const rep = editText(this.client, message.content);
            if (message.content !== rep) message.edit(rep);
            return;
        }

        const color = this.client.config.color === 'random'
        ? (1 << 24) * Math.random() | 0
        : this.client.config.color === 'auto'
        ? message.guild
        ? this.client.util.displayColor(message.member)
        : 0
        : this.client.config.color || 0;

        const embed = new RichEmbed().setImage(image).setColor(color);
        
        return message.edit(editText(this.client, message.content.replace(name[0], '')), { embed }).catch(err => {
            if (err.response && err.response.badRequest){
                this.client.logger.log(3, 'Your image was invalid. Double check your link!');
                return message.delete();
            }
            
            throw err;
        });
    }
    
    const rep = editText(this.client, message.content);
    if (message.content !== rep) return message.edit(rep);
}

module.exports = new Listener('messageInvalid', exec, {
    emitter: 'commandHandler',
    eventName: 'messageInvalid',
    type: 'on'
});
