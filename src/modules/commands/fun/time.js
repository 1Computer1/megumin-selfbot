const { Command } = require('discord-akairo');
const request = require('superagent');
const Logger = require('../../../util/Logger');

const timeIsURL = 'https://time.is/';
const clocks = ['🕛', '🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚'];

function exec(message, args) {
    if (!args.content) {
        Logger.warn('No location provided.');
        return message.delete();
    }

    return request.get(`${timeIsURL}${args.content}`).set({ 'Accept-Language': 'en-US' }).then(({ text }) => {
        const time = text.match(/<div id="twd">([^]+?)<\/div>/)[1].replace(/<span id="ampm" style="font-size:21px;line-height:21px">(AM|PM)<\/span>/, ' $1');
        const clock = clocks[parseInt(time.split(':')[0], 10) % 12];
        const place = text.match(/<div id="msgdiv"><h1>Time in ([^]+?) now<\/h1>/)[1];

        return message.edit(`${clock}\u2000The time in ${place} is ${time}.`);
    }).catch(err => {
        if (err.status === 404) {
            Logger.warn(`Location ${args.content} not found.`);
        } else {
            Logger.warn(`Time.is errored: ${err}`);
        }

        return message.delete();
    });
}

module.exports = new Command('time', exec, {
    aliases: ['time'],
    args: [
        {
            id: 'content',
            match: 'content'
        }
    ],
    category: 'fun'
});
