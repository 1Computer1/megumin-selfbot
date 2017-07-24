const { Command } = require('discord-akairo');
const request = require('snekfetch');

const Logger = require('../../util/Logger');

class DocsCommand extends Command {
    constructor() {
        super('docs', {
            aliases: ['docs'],
            category: 'info',
            args: [
                {
                    id: 'query'
                },
                {
                    id: 'version',
                    type: ['master', 'stable'],
                    default: 'stable'
                }
            ]
        });

        this.docs = {};
    }

    async fetchDocs(version) {
        if (this.docs[version]) return this.docs[version];

        const link = `https://raw.githubusercontent.com/hydrabolt/discord.js/docs/${version}.json`;
        const { text } = await request.get(link);
        const json = JSON.parse(text);

        this.docs[version] = json;
        return json;
    }

    search(docs, query) {
        query = query.split(/[#.]/);
        const mainQuery = query[0].toLowerCase();
        let memberQuery = query[1] ? query[1].toLowerCase() : null;

        const findWithin = (parentItem, props, name) => {
            let found = null;
            for (const category of props) {
                if (!parentItem[category]) continue;
                const item = parentItem[category].find(i => i.name.toLowerCase() === name);
                if (item) {
                    found = { item, category };
                    break;
                }
            }

            return found;
        };

        const main = findWithin(docs, ['classes', 'interfaces', 'typedefs'], mainQuery);
        if (!main) return [];

        const res = [main];
        if (!memberQuery) return res;

        let props;
        if (/\(.*?\)$/.test(memberQuery)) {
            memberQuery = memberQuery.replace(/\(.*?\)$/, '');
            props = ['methods'];
        } else {
            props = main.category === 'typedefs' ? ['props'] : ['props', 'methods', 'events'];
        }

        const member = findWithin(main.item, props, memberQuery);
        if (!member) return [];

        const rest = query.slice(2);
        if (rest.length) {
            if (!member.item.type) return [];
            const base = this.joinType(member.item.type || member.item.returns.types || member.item.returns)
            .replace(/<.+>/g, '')
            .replace(/\|.+/, '')
            .trim();

            return this.search(docs, `${base}.${rest.join('.')}`);
        }

        res.push(member);
        return res;
    }

    clean(text) {
        return text
        .replace(/\n/g, ' ')
        .replace(/<\/?(?:info|warn)>/g, '')
        .replace(/\{@link (.+?)\}/g, '`$1`');
    }

    joinType(type) {
        return type.map(t => t.map(a => Array.isArray(a) ? a.join('') : a).join('')).join(' | ');
    }

    makeLink(main, member, version) {
        return `https://discord.js.org/#/docs/main/${version}/${main.category === 'classes' ? 'class' : 'typedef'}/${main.item.name}?scrollTo=${member.item.scope === 'static' ? 's-' : ''}${member.item.name}`;
    }

    formatMain(main, version) {
        const embed = this.client.util.embed();

        let description = `__**[${main.item.name}`;
        if (main.item.extends) description += ` (extends ${main.item.extends[0]})`;
        description += `](https://discord.js.org/#/docs/main/${version}/${main.category === 'classes' ? 'class' : 'typedef'}/${main.item.name})**__\n`;

        if (main.item.description) description += `\n${this.clean(main.item.description)}`;
        embed.setDescription(description);

        const join = it => `\`${it.map(i => i.name).join('` `')}\``;

        const props = main.item.props ? join(main.item.props) : null;
        if (props) embed.addField('Properties', props);

        const methods = main.item.methods ? join(main.item.methods) : null;
        if (methods) embed.addField('Methods', methods);

        const events = main.item.events ? join(main.item.events) : null;
        if (events) embed.addField('Events', events);

        return embed;
    }

    formatProp(main, member, version) {
        const embed = this.client.util.embed();

        let description = `__**[${main.item.name}${member.item.scope === 'static' ? '.' : '#'}${member.item.name}](${this.makeLink(main, member, version)})**__\n`;

        if (member.item.description) description += `\n${this.clean(member.item.description)}`;
        embed.setDescription(description);

        const type = this.joinType(member.item.type);
        embed.addField('Type', `\`${type}\``);

        if (member.item.examples) {
            embed.addField('Example', `\`\`\`js\n${member.item.examples.join('```\n```js\n')}\`\`\``);
        }

        return embed;
    }

    formatMethod(main, member, version) {
        const embed = this.client.util.embed();

        let description = `__**[${main.item.name}${member.item.scope === 'static' ? '.' : '#'}${member.item.name}()](${this.makeLink(main, member, version)})**__\n`;

        if (member.item.description) description += `\n${this.clean(member.item.description)}`;
        embed.setDescription(description);

        if (member.item.params) {
            const params = member.item.params.map(param => {
                const name = param.optional ? `[${param.name}]` : param.name;
                const type = this.joinType(param.type);
                return `\`${name}: ${type}\`\n${this.clean(param.description)}`;
            });

            embed.addField('Parameters', params.join('\n\n'));
        }

        if (member.item.returns) {
            const desc = member.item.returns.description ? `${this.clean(member.item.returns.description)}\n` : '';
            const type = this.joinType(member.item.returns.types || member.item.returns);
            const returns = `${desc}\`=> ${type}\``;
            embed.addField('Returns', returns);
        } else {
            embed.addField('Returns', '`=> void`');
        }

        if (member.item.examples) {
            embed.addField('Example', `\`\`\`js\n${member.item.examples.join('```\n```js\n')}\`\`\``);
        }

        return embed;
    }

    formatEvent(main, member, version) {
        const embed = this.client.util.embed();

        let description = `__**[${main.item.name}#${member.item.name}](${this.makeLink(main, member, version)})**__\n`;

        if (member.item.description) description += `\n${this.clean(member.item.description)}`;
        embed.setDescription(description);

        if (member.item.params) {
            const params = member.item.params.map(param => {
                const type = this.joinType(param.type);
                return `\`${param.name}: ${type}\`\n${this.clean(param.description)}`;
            });

            embed.addField('Parameters', params.join('\n\n'));
        }

        if (member.item.examples) {
            embed.addField('Example', `\`\`\`js\n${member.item.examples.join('```\n```js\n')}\`\`\``);
        }

        return embed;
    }

    async exec(message, { query, version }) {
        if (!query) {
            Logger.error('No query provided.');
            return message.delete();
        }

        const docs = await this.fetchDocs(version);
        const [main, member] = this.search(docs, query);

        if (!main) {
            Logger.error('Could not find entry in docs.');
            return message.delete();
        }

        const embed = member ? {
            props: this.formatProp,
            methods: this.formatMethod,
            events: this.formatEvent
        }[member.category].call(this, main, member, version) : this.formatMain(main, version);

        const color = this.client.getColor(message);

        embed
        .setColor(color)
        .setURL(`https://discord.js.org/#/docs/main/${version}`)
        .setAuthor(`Discord.js Docs (${version})`, 'https://cdn.discordapp.com/icons/222078108977594368/bc226f09db83b9176c64d923ff37010b.webp');

        return message.edit({ embed });
    }
}

module.exports = DocsCommand;
