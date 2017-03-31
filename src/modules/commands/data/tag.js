const { Command } = require('discord-akairo');
const FileSystem = require('../../../util/FileSystem');

function exec(message, args) {
    if (['add', 'new', 'set'].includes(args.option)) {
        if (!args.name || !args.content) {
            this.client.logger.log(3, 'No tag name or content provided.');
            return message.delete();
        }

        if (this.client.tags.hasOwnProperty(args.name.toLowerCase())) {
            this.client.logger.log(3, `Tag [${args.name.toLowerCase()}] already exists. Remove it first.`);
            return message.delete();
        }

        this.client.tags[args.name.toLowerCase()] = args.content;

        return FileSystem.writeFile('./src/data/tags.json', JSON.stringify(this.client.tags, null, '\t')).then(() => {
            delete require.cache[require.resolve('../../../data/tags.json')];
            this.client.tags = require('../../../data/tags.json');

            this.client.logger.log(2, `Tag [${args.name.toLowerCase()}] added: "${args.content}"`);
            return message.delete();
        });
    }

    if (['remove', 'delete', 'del'].includes(args.option)) {
        if (!args.name) {
            this.client.logger.log(3, 'No tag name provided.');
            return message.delete();
        }

        if (!this.client.tags.hasOwnProperty(args.name.toLowerCase())) {
            this.client.logger.log(3, `Tag [${args.name.toLowerCase()}] does not exist.`);
            return message.delete();
        }

        delete this.client.tags[args.name.toLowerCase()];

        return FileSystem.writeFile('./src/data/tags.json', JSON.stringify(this.client.tags, null, '\t')).then(() => {
            delete require.cache[require.resolve('../../../data/tags.json')];
            this.client.tags = require('../../../data/tags.json');

            this.client.logger.log(2, `Tag [${args.name.toLowerCase()}] removed.`);
            return message.delete();
        });
    }

    if (args.option === 'reload') {
        delete require.cache[require.resolve('../../../data/tags.json')];
        this.client.tags = require('../../../data/tags.json');

        this.client.logger.log(2, 'Reloaded tags.json.');
        return message.delete();
    }

    const keys = Object.keys(this.client.tags);
    return message.editCode('json', keys.length ? keys.sort().map(tag => `[${tag}]`).join(', ') : 'No tags added.');
}

module.exports = new Command('tag', exec, {
    aliases: ['tag', 'tags', 't'],
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
            id: 'content',
            match: 'rest'
        }
    ],
    split: 'quoted',
    category: 'data'
});
