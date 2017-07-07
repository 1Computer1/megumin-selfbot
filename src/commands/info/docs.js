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

    clean(text) {
        return text.replace(/<\/?(info|warn)>/g, '').replace(/\{@link (.+?)\}/g);
    }

    joinType(type) {
        return type.map(t => t.map(a => a.join('')).join('')).join(' | ');
    }

    makeLink(mainItem, item, version) {
        return `https://discord.js.org/#/docs/main/${version}/class/${mainItem.name}?scrollTo=${item.scope === 'static' ? 's-' : ''}${item.name}`;
    }

    formatMain(item, version) {
        const embed = this.client.util.embed();

        let description = `[${item.name}](https://discord.js.org/#/docs/main/${version}/class/${item.name})`;
        if (item.extends) description += ` (extends ${item.extends[0]})`;

        if (item.description) description += `\n${this.clean(item.description)}`;
        embed.setDescription(description);

        const join = it => `\`${it.map(i => i.name).join('` `')}\``;

        const props = item.props ? join(item.props) : null;
        if (props) embed.addField('Properties', props);

        const methods = item.methods ? join(item.methods) : null;
        if (methods) embed.addField('Methods', methods);

        const events = item.events ? join(item.events) : null;
        if (events) embed.addField('Events', events);

        return embed;
    }

    formatProp(item, mainItem, version) {
        const embed = this.client.util.embed();

        let description = `[${mainItem.name}${item.scope === 'static' ? '.' : '#'}${item.name}](${this.makeLink(mainItem, item, version)})`;

        if (item.description) description += `\n${this.clean(item.description)}`;
        embed.setDescription(description);

        const type = this.joinType(item.type);
        embed.addField('Type', `\`${type}\``);

        return embed;
    }

    formatMethod(item, mainItem, version) {
        const embed = this.client.util.embed();
        let description = `[${mainItem.name}${item.scope === 'static' ? '.' : '#'}${item.name}](${this.makeLink(mainItem, item, version)})`;

        if (item.description) description += `\n${this.clean(item.description)}`;
        embed.setDescription(description);

        if (item.params) {
            const params = item.params.map(param => {
                const name = param.optional ? `[${param.name}]` : param.name;
                const type = this.joinType(param.type);
                return `\`${name}: ${type}\`\n${this.clean(param.description)}`;
            });

            embed.addField('Parameters', params.join('\n\n'));
        }

        if (item.returns) {
            const desc = item.returns.description ? `${this.clean(item.returns.description)}\n` : '';
            const type = this.joinType(item.returns.types || item.returns);
            const returns = `${desc}\`=> ${type}\``;
            embed.addField('Returns', returns);
        } else {
            embed.addField('Returns', '`=> void`');
        }

        return embed;
    }

    formatEvent(item, mainItem, version) {
        const embed = this.client.util.embed();

        let description = `[${mainItem.name}#${item.name}](${this.makeLink(mainItem, item, version)})`;

        if (item.description) description += `\n${this.clean(item.description)}`;
        embed.setDescription(description);

        if (item.params) {
            const params = item.params.map(param => {
                const type = this.joinType(param.type);
                return `\`${param.name}: ${type}\`\n${this.clean(param.description)}`;
            });

            embed.addField('Parameters', params.join('\n\n'));
        }

        return embed;
    }

    async exec(message, { query, version }) {
        if (!query) {
            Logger.error('No query provided.');
            return message.delete();
        }

        const docs = await this.fetchDocs(version);
        const [main, member] = new DocsSearch(docs, query).find();

        if (!main) {
            Logger.error('Could not find entry in docs.');
            return message.delete();
        }

        let embed;

        if (!member) {
            embed = this.formatMain(main.item, version);
        } else {
            embed = {
                props: this.formatProp,
                methods: this.formatMethod,
                events: this.formatEvent
            }[member.type].call(this, member.item, main.item, version);
        }

        const color = this.client.getColor(message);

        embed
        .setColor(color)
        .setURL(`https://discord.js.org/#/docs/main/${version}`)
        .setAuthor(`Discord.js Docs (${version})`, 'https://cdn.discordapp.com/icons/222078108977594368/bc226f09db83b9176c64d923ff37010b.webp');

        return message.edit({ embed });
    }
}

class DocsSearch {
    constructor(docs, query) {
        this.docs = docs;

        query = query.split(/[#.]/);
        this.mainQuery = query[0].toLowerCase();
        this.memberQuery = query[1] ? query[1].toLowerCase() : null;
    }

    find() {
        const main = this.findWithin(this.docs, ['classes', 'interfaces', 'typedefs'], this.mainQuery);
        if (!main) return [];

        const res = [main];
        if (!this.memberQuery) return res;

        const member = this.findWithin(main.item, {
            classes: ['props', 'methods', 'events'],
            interfaces: ['props', 'methods', 'events'],
            typedefs: ['props']
        }[main.type], this.memberQuery);

        if (!member) return [];
        res.push(member);
        return res;
    }

    findWithin(parentItem, props, query) {
        let found = null;

        for (const type of props) {
            if (!parentItem[type]) continue;
            const item = parentItem[type].find(i => i.name.toLowerCase() === query);
            if (item) {
                found = { item, type };
                break;
            }
        }

        return found;
    }
}

module.exports = DocsCommand;
