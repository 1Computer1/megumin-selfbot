const { Command } = require('discord-akairo');
const request = require('superagent');

const ENDPOINT = 'https://api.kurisubrooks.com/api/translate';
const SUPPORTED = 'https://raw.githubusercontent.com/kurisubrooks/sherlock/master/modules/api/translate/langs.json';

function exec(message, args) {
    if (args.list) {
        return request.get(SUPPORTED).then(({ text }) => {
            const body = JSON.parse(text);
            return message.editCode('json', body.map(lang => lang.code).join(', '));
        });
    }

    if (!args.text) {
        this.client.logger.log(3, 'No text provided.');
        return message.delete();
    }

    return request.get(ENDPOINT).query({
        query: args.text,
        to: args.to,
        from: args.from || undefined
    }).set({
        'X-Discord-ID': this.client.user.id,
        'X-Discord-User': `${this.client.user.username}#${this.client.user.discriminator}`
    }).then(({ body }) => {
        if (!body.ok) {
            this.client.logger.log(3, `Translate API errored: ${body.error}`);
            return message.delete();
        }

        const color = this.client.color(message);
        const embed = this.client.util.embed()
        .setColor(color)
        .setTitle(`${body.from.name} → ${body.to.name}`)
        .setDescription(body.result);

        return message.edit(body.query, { embed });
    });
}

module.exports = new Command('translate', exec, {
    aliases: ['translate', 'tl'],
    args: [
        {
            id: 'text',
            match: 'text'
        },
        {
            id: 'to',
            match: 'prefix',
            prefix: 'to:',
            default: 'ja'
        },
        {
            id: 'from',
            match: 'prefix',
            prefix: 'from:'
        },
        {
            id: 'list',
            match: 'flag',
            prefix: '--list'
        }
    ],
    category: 'fun'
});
