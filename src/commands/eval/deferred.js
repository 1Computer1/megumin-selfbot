const { Command } = require('discord-akairo');

class DeferredCommand extends Command {
    constructor() {
        super('deferred', {
            aliases: ['deferred', 'def'],
            category: 'eval'
        });
    }

    exec(message) {
        const collector = message.channel.createMessageCollector(m => m.id !== message.id && m.author.id === message.author.id);
        this.handler.addPrompt(message);

        collector.on('collect', m => {
            if (m.content === '.') return collector.stop('stop');
            if (m.content === '..') return collector.stop('cancel');
            return undefined;
        });

        collector.on('end', async (coll, reason) => {
            this.handler.removePrompt(message);
            let msgs = await message.channel.fetchMessages({ after: message.id, limit: 100 });
            msgs = msgs.filter(m => coll.has(m.id));

            if (reason === 'cancel' || msgs.size === 1) {
                await Promise.all(msgs.deleteAll());
                return message.delete();
            }

            await Promise.all(msgs.deleteAll());
            const code = msgs.map(m => m.content).slice(1).reverse().join('\n');
            return this.handler.modules.get('eval').exec(message, { code });
        });
    }
}

module.exports = DeferredCommand;
