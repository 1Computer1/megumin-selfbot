const { Listener } = require('discord-akairo');
const { RichEmbed } = require('discord.js');
const tags = require('../../data/tags.json');
const images = require('../../data/images.json');

function replaceTags(text){
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
        const image = images[name[1].toLowerCase()];

        if (!image){
            const rep = replaceTags(message.content);
            if (message.content !== rep) message.edit(rep);
            return;
        }

        const embed = new RichEmbed().setImage(image);
        return message.edit(replaceTags(message.content.replace(name[0], '')), { embed }).catch(err => {
            if (err.response && err.response.badRequest){
                this.framework.logger.log(3, 'Your image was invalid. Double check your link!');
                return message.delete();
            }
            
            throw err;
        });
    }
    
    const rep = replaceTags(message.content);
    if (message.content !== rep) message.edit(rep);
}

module.exports = new Listener('messageInvalid', exec, {
    emitter: 'commandHandler',
    eventName: 'messageInvalid',
    type: 'on'
});
