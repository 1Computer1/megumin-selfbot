const { Command } = require('discord-akairo');
const fs = require('fs');
let images = require('../../data/images.json');

function exec(message, args){
    if (args.option === 'list'){
        const keys = Object.keys(images);
        return message.editCode('json', keys.length ? keys.sort().map(image => `{${image}}`).join(', ') : 'No images added.');
    }

    if (args.option === 'add'){
        if (!args.name || !args.content){
            this.framework.logger.log(3, 'No image name or link provided.');
            return message.delete();
        }

        if (images.hasOwnProperty(args.name.toLowerCase())){
            this.framework.logger.log(3, `Image {${args.name.toLowerCase()}} already exists. Remove it first.`);
            return message.delete();
        }

        images[args.name.toLowerCase()] = args.content;

        fs.writeFileSync('./src/data/images.json', JSON.stringify(images, null, '\t'));
        delete require.cache[require.resolve('../../data/images.json')];
        images = require('../../data/images.json');

        this.framework.logger.log(2, `Image {${args.name.toLowerCase()}} added: "${args.content}"`);
        return message.delete();
    }

    if (args.option === 'remove'){
        if (!args.name){
            this.framework.logger.log(3, 'No image name provided.');
            return message.delete();
        }

        if (!images.hasOwnProperty(args.name.toLowerCase())){
            this.framework.logger.log(3, `Image {${args.name.toLowerCase()}} does not exist.`);
            return message.delete();
        }

        delete images[args.name.toLowerCase()];

        fs.writeFileSync('./src/data/images.json', JSON.stringify(images, null, '\t'));
        delete require.cache[require.resolve('../../data/images.json')];
        images = require('../../data/images.json');

        this.framework.logger.log(2, `Image {${args.name.toLowerCase()}} removed.`);
        return message.delete();
    }

    if (args.option === 'reload'){
        delete require.cache[require.resolve('../../data/images.json')];
        images = require('../../data/images.json');

        this.framework.logger.log(2, 'Reloaded images.json.');
        return message.delete();
    }
}

module.exports = new Command('image', exec, {
    aliases: ['image', 'images'],
    args: [
        {
            id: 'option',
            type: ['list', 'add', 'remove', 'reload'],
            defaultValue: 'list'
        },
        {
            id: 'name'
        },
        {
            id: 'content'
        }
    ],
    split: 'quoted'
});
