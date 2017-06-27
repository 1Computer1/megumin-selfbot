const { Command } = require('discord-akairo');
const xkcd = require('relevant-xkcd');

class XKCDCommand extends Command {
    constructor() {
        super('xkcd', {
            aliases: ['xkcd'],
            category: 'info',
            clientPermissions: ['EMBED_LINKS'],
            args: [
                {
                    id: 'text',
                    match: 'content'
                }
            ]
        });
    }

    fetchComic(query) {
        if (!query) {
            return xkcd.fetchRandom();
        }

        if (!isNaN(query) && parseInt(query) === 0) {
            return xkcd.fetchCurrent();
        }

        if (!isNaN(query)) {
            return xkcd.fetchComic(parseInt(query));
        }

        return xkcd.fetchRelevant(query);
    }

    async exec(message, { text }) {
        const comic = await this.fetchComic(text);
        const color = this.client.getColor(message);
        const embed = this.client.util.embed()
        .setColor(color)
        .setTitle(comic.title)
        .setURL(comic.explainURL)
        .setDescription(comic.altText)
        .setImage(comic.imageURL)
        .setFooter(comic.xkcdURL);

        return message.edit({ embed });
    }
}

module.exports = XKCDCommand;
