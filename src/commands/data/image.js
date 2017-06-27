const fs = require('fs');
const path = require('path');
const util = require('util');

const { Command } = require('discord-akairo');
const request = require('snekfetch');

const Logger = require('../../util/Logger');

const writeFile = util.promisify(fs.writeFile);
const mkdir = util.promisify(fs.mkdir);

class ImageCommand extends Command {
    constructor() {
        super('image', {
            aliases: ['image', 'images', 'img', 'i'],
            category: 'data',
            split: 'sticky',
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
                    id: 'text',
                    match: 'rest'
                }
            ]
        });
    }

    async addImage(name, text) {
        const cwdPath = './src/data/images';
        const relPath = '../../data/images.json';

        if (!name || !text) {
            Logger.error('No image name or link provided.');
            return;
        }

        if (this.client.images.hasOwnProperty(name.toLowerCase())) {
            Logger.error(`Image {${name.toLowerCase()}} already exists. Remove it first.`);
            return;
        }

        if (this.client.config.downloadImages) {
            const { body } = await request.get(text);
            await mkdir(cwdPath).catch(() => null);
            const ext = path.extname(text);
            this.client.images[name.toLowerCase()] = `${cwdPath}${name.toLowerCase()}${ext}`;
            await writeFile(`${cwdPath}${name.toLowerCase()}${ext}`, body);
        } else {
            this.client.images[name.toLowerCase()] = text;
        }

        await writeFile(`${cwdPath}.json`, JSON.stringify(this.client.images, null, 4));
        delete require.cache[require.resolve(relPath)];
        this.client.images = require(relPath);

        Logger.info(`Image {${name.toLowerCase()}} added: "${this.client.images[name.toLowerCase()]}"`);
    }

    async removeImage(name) {
        const cwdPath = './src/data/images';
        const relPath = '../../data/images.json';

        if (!name) {
            Logger.error('No image name provided.');
            return;
        }

        if (!this.client.images.hasOwnProperty(name.toLowerCase())) {
            Logger.error(`Image {${name.toLowerCase()}} does not exist.`);
            return;
        }

        delete this.client.images[name.toLowerCase()];

        await writeFile(`${cwdPath}.json`, JSON.stringify(this.client.images, null, 4));
        delete require.cache[require.resolve(relPath)];
        this.client.images = require(relPath);

        Logger.info(`Image {${name.toLowerCase()}} removed.`);
    }

    reloadImages() {
        const relPath = '../../data/images.json';

        delete require.cache[require.resolve(relPath)];
        this.client.images = require(relPath);

        Logger.info('Reloaded images.json.');
    }

    listImages() {
        const keys = Object.keys(this.client.images);
        return keys.length ? `\`\`${keys.sort().join('`` ``')}\`\`` : 'No images added.';
    }

    async exec(message, { option, name, text }) {
        if (option === 'list') {
            const images = this.listImages();
            return message.edit(images);
        }

        if (option === 'add') {
            await this.addImage(name, text);
        } else
        if (option === 'remove') {
            await this.removeImage(name);
        } else
        if (option === 'reload') {
            await this.reloadImages();
        }

        return message.delete();
    }
}

module.exports = ImageCommand;
