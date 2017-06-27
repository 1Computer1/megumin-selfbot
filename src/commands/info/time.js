const { Command } = require('discord-akairo');
const request = require('snekfetch');

const Logger = require('../../util/Logger');

class TimeCommand extends Command {
    constructor() {
        super('time', {
            aliases: ['time'],
            category: 'info',
            args: [
                {
                    id: 'location',
                    match: 'content',
                    default: () => this.client.config.location
                }
            ]
        });
    }

    async exec(message, { location }) {
        if (!location) {
            Logger.error('No location provided.');
            return message.delete();
        }

        try {
            const { text } = await request.get(`https://time.is/${location}`).set('Accept-Language', 'en-US');
            const time = text.match(/<div id="twd">([^]+?)<\/div>/)[1].replace(/<span id="ampm" style="font-size:21px;line-height:21px">(AM|PM)<\/span>/, ' $1');
            const clock = ['🕛', '🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚'][parseInt(time.split(':')[0], 10) % 12];
            const place = text.match(/<div id="msgdiv"><h1>Time in ([^]+?) now<\/h1>/)[1];
            return message.edit(`${clock}\u2000The time in ${place} is ${time}.`);
        } catch (err) {
            if (err.status === 404) {
                Logger.error(`Location ${location} not found.`);
            } else {
                Logger.error(`Time finding errored: ${err}`);
                console.error(err);
            }

            return message.delete();
        }
    }
}

module.exports = TimeCommand;
