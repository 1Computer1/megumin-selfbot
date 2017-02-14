const { Listener } = require('discord-akairo');
const { RichEmbed } = require('discord.js');

function replaceTags(text, tags){
    const matched = text.match(/\[.+?\]/g);

    if (matched) matched.forEach(word => {
        if (!/\[.+?\]/.test(word)) return;

        const tag = tags[word.slice(1, -1).toLowerCase()];
        if (!tag) return;

        text = text.replace(word, tag);
    });

    return text;
}

function exec(message){
    if (/^\{.+?\}/.test(message.content)){
        const name = message.content.match(/^\{(.+?)\}/);
        const image = this.client.images[name[1].toLowerCase()];

        if (!image){
            const rep = replaceTags(message.content, this.client.tags);
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

        const embed = new RichEmbed().setImage(image)
        .setColor(color);

        return message.edit(replaceTags(message.content.replace(name[0], ''), this.client.tags), { embed }).catch(err => {
            if (err.response && err.response.badRequest){
                this.client.logger.log(3, 'Your image was invalid. Double check your link!');
                return message.delete();
            }
            
            throw err;
        });
    }
    
    const rep = replaceTags(message.content, this.client.tags);
    if (message.content !== rep) message.edit(rep);
}

module.exports = new Listener('messageInvalid', exec, {
    emitter: 'commandHandler',
    eventName: 'messageInvalid',
    type: 'on'
});
