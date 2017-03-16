const { Command } = require('discord-akairo');
const fs = require('fs');

function exec(message, args){
    if (args.option === 'list'){
        const keys = Object.keys(this.client.images);
        return message.editCode('json', keys.length ? keys.sort().map(image => `{${image}}`).join(', ') : 'No images added.');
    }

    if (['add', 'new', 'set'].includes(args.option)){
        if (!args.name || !args.content){
            this.client.logger.log(3, 'No image name or link provided.');
            return message.delete();
        }

        if (this.client.images.hasOwnProperty(args.name.toLowerCase())){
            this.client.logger.log(3, `Image {${args.name.toLowerCase()}} already exists. Remove it first.`);
            return message.delete();
        }

        this.client.images[args.name.toLowerCase()] = args.content;

        fs.writeFileSync('./src/data/images.json', JSON.stringify(this.client.images, null, '\t'));
        delete require.cache[require.resolve('../../../data/images.json')];
        this.client.images = require('../../../data/images.json');

        this.client.logger.log(2, `Image {${args.name.toLowerCase()}} added: "${args.content}"`);
        return message.delete();
    }

    if (['remove', 'delete', 'del'].includes(args.option)){
        if (!args.name){
            this.client.logger.log(3, 'No image name provided.');
            return message.delete();
        }

        if (!this.client.images.hasOwnProperty(args.name.toLowerCase())){
            this.client.logger.log(3, `Image {${args.name.toLowerCase()}} does not exist.`);
            return message.delete();
        }

        delete this.client.images[args.name.toLowerCase()];

        fs.writeFileSync('./src/data/images.json', JSON.stringify(this.client.images, null, '\t'));
        delete require.cache[require.resolve('../../../data/images.json')];
        this.client.images = require('../../../data/images.json');

        this.client.logger.log(2, `Image {${args.name.toLowerCase()}} removed.`);
        return message.delete();
    }

    if (args.option === 'reload'){
        delete require.cache[require.resolve('../../../data/images.json')];
        this.client.images = require('../../../data/images.json');

        this.client.logger.log(2, 'Reloaded images.json.');
        return message.delete();
    }
}

module.exports = new Command('image', exec, {
    aliases: ['image', 'images', 'img', 'i'],
    args: [
        {
            id: 'option',
            type: ['list', 'add', 'new', 'set', 'remove', 'delete', 'del', 'reload'],
            default: 'list'
        },
        {
            id: 'name'
        },
        {
            id: 'content'
        }
    ],
    split: 'quoted',
    category: 'data'
});
