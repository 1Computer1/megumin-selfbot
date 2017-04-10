const { Command } = require('discord-akairo');

function exec(message) {
    const color = this.client.color(message);
    const embed = this.client.util.embed().setColor(color);

    const fields = [
        [
            'Memory Usage',
            `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
            true
        ],
        [
            'Client Uptime',
            this.formatMilliseconds(this.client.uptime),
            true
        ],
        [
            'Github Repo',
            '[Selfbot by 1Computer](https://github.com/1Computer1/megumin-selfbot)',
            true
        ]
    ];

    for (const field of fields) embed.addField(...field);
    return message.edit({ embed });
}

module.exports = new Command('stats', exec, {
    aliases: ['stats', 'info', 'about'],
    clientPermissions: ['EMBED_LINKS'],
    category: 'info'
});

module.exports.formatMilliseconds = ms => {
    let x = Math.floor(ms / 1000);
    let seconds = x % 60;

    x = Math.floor(x / 60);
    let minutes = x % 60;

    x = Math.floor(x / 60);
    let hours = x % 24;

    let days = Math.floor(x / 24);

    seconds = `${'0'.repeat(2 - seconds.toString().length)}${seconds}`;
    minutes = `${'0'.repeat(2 - minutes.toString().length)}${minutes}`;
    hours = `${'0'.repeat(2 - hours.toString().length)}${hours}`;
    days = `${'0'.repeat(Math.max(0, 2 - days.toString().length))}${days}`;

    return `${days !== '00' ? `${days}:` : ''}${hours}:${minutes}:${seconds}`;
};
