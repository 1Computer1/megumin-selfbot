const fs = require('fs');
const util = require('util');

const { Command } = require('discord-akairo');

const Logger = require('../../util/Logger');

const writeFile = util.promisify(fs.writeFile);

class TagCommand extends Command {
    constructor() {
        super('tag', {
            aliases: ['tag', 'tags', 't'],
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

    async addTag(name, text) {
        const cwdPath = './src/data/tags.json';
        const relPath = '../../data/tags.json';

        if (!name || !text) {
            Logger.error('No tag name or content provided.');
            return;
        }

        if (this.client.tags.hasOwnProperty(name.toLowerCase())) {
            Logger.error(`Tag [${name.toLowerCase()}] already exists. Remove it first.`);
            return;
        }

        this.client.tags[name.toLowerCase()] = text;

        await writeFile(cwdPath, JSON.stringify(this.client.tags, null, 4));
        delete require.cache[require.resolve(relPath)];
        this.client.tags = require(relPath);

        Logger.info(`Tag [${name.toLowerCase()}] added: "${text}"`);
    }

    async removeTag(name) {
        const cwdPath = './src/data/tags.json';
        const relPath = '../../data/tags.json';

        if (!name) {
            Logger.error('No tag name provided.');
            return;
        }

        if (!this.client.tags.hasOwnProperty(name.toLowerCase())) {
            Logger.error(`Tag [${name.toLowerCase()}] does not exist.`);
            return;
        }

        delete this.client.tags[name.toLowerCase()];

        await writeFile(cwdPath, JSON.stringify(this.client.tags, null, 4));
        delete require.cache[require.resolve(relPath)];
        this.client.tags = require(relPath);

        Logger.info(`Tag [${name.toLowerCase()}] removed.`);
    }

    reloadTags() {
        const relPath = '../../data/tags.json';

        delete require.cache[require.resolve(relPath)];
        this.client.tags = require(relPath);
        Logger.info('Reloaded tags.json.');
    }

    listTags() {
        const keys = Object.keys(this.client.tags);
        return keys.length ? `\`\`${keys.sort().join('`` ``')}\`\`` : 'No tags added.';
    }

    async exec(message, { option, name, text }) {
        if (option === 'list') {
            const tags = this.listTags();
            return message.edit(tags);
        }

        if (option === 'add') {
            await this.addTag(name, text);
        } else
        if (option === 'remove') {
            await this.removeTag(name);
        } else
        if (option === 'reload') {
            await this.reloadTags();
        }

        return message.delete();
    }
}

module.exports = TagCommand;
