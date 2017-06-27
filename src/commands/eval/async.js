const { Command } = require('discord-akairo');
const Logger = require('../../util/Logger');

class AsyncCommand extends Command {
    constructor() {
        super('async', {
            aliases: ['async', 'a'],
            category: 'eval',
            args: [
                {
                    id: 'code',
                    match: 'content'
                }
            ]
        });
    }

    exec(message, { code }) {
        if (!code) {
            Logger.error('No code provided to evaluate.');
            return message.delete();
        }

        const input = code;
        code = `(async()=>{${code}})()`;
        return this.handler.modules.get('eval').exec(message, { code, input });
    }
}

module.exports = AsyncCommand;
