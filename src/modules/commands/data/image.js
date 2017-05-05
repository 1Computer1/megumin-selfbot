const { Command } = require('discord-akairo');
const request = require('superagent');
const path = require('path');
const Logger = require('../../../util/Logger');
const FileSystem = require('../../../util/FileSystem');

function exec(message, args) {
    if (args.option === 'add') {
        if (!args.name || !args.content) {
            Logger.warn('No image name or link provided.');
            return message.delete();
        }

        if (this.client.images.hasOwnProperty(args.name.toLowerCase())) {
            Logger.warn(`Image {${args.name.toLowerCase()}} already exists. Remove it first.`);
            return message.delete();
        }

        const save = this.client.config.downloadImages
        ? request.get(args.content).then(res => {
            return FileSystem.mkdir('./src/data/images/').then(() => {
                const ext = path.extname(args.content);
                this.client.images[args.name.toLowerCase()] = `./src/data/images/${args.name.toLowerCase()}${ext}`;
                return FileSystem.writeFile(`./src/data/images/${args.name.toLowerCase()}${ext}`, res.body);
            });
        })
        : new Promise(resolve => {
            this.client.images[args.name.toLowerCase()] = args.content;
            return resolve();
        });

        return save.then(() => {
            return FileSystem.writeFile('./src/data/images.json', JSON.stringify(this.client.images, null, '\t')).then(() => {
                delete require.cache[require.resolve('../../../data/images.json')];
                this.client.images = require('../../../data/images.json');

                Logger.debug(`Image {${args.name.toLowerCase()}} added: "${this.client.images[args.name.toLowerCase()]}"`);
                return message.delete();
            });
        });
    }

    if (args.option === 'remove') {
        if (!args.name) {
            Logger.warn('No image name provided.');
            return message.delete();
        }

        if (!this.client.images.hasOwnProperty(args.name.toLowerCase())) {
            Logger.warn(`Image {${args.name.toLowerCase()}} does not exist.`);
            return message.delete();
        }

        delete this.client.images[args.name.toLowerCase()];

        return FileSystem.writeFile('./src/data/images.json', JSON.stringify(this.client.images, null, '\t')).then(() => {
            delete require.cache[require.resolve('../../../data/images.json')];
            this.client.images = require('../../../data/images.json');

            Logger.debug(`Image {${args.name.toLowerCase()}} removed.`);
            return message.delete();
        });
    }

    if (args.option === 'reload') {
        delete require.cache[require.resolve('../../../data/images.json')];
        this.client.images = require('../../../data/images.json');

        Logger.debug('Reloaded images.json.');
        return message.delete();
    }

    const keys = Object.keys(this.client.images);
    return message.edit(keys.length ? `\`\`${keys.sort().join('`` ``')}\`\`` : 'No images added.');
}

module.exports = new Command('image', exec, {
    aliases: ['image', 'images', 'img', 'i'],
    args: [
        {
            id: 'option',
            type: [['list', 'ls'], ['add', 'new', 'set'], ['remove', 'delete', 'del'], 'reload'],
            default: 'list'
        },
        {
            id: 'name'
        },
        {
            id: 'content',
            match: 'rest'
        }
    ],
    split: 'sticky',
    category: 'data'
});
