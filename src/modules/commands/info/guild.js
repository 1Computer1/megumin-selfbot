const { Command } = require('discord-akairo');
const moment = require('moment');

function exec(message, args) {
    const color = this.client.color(message);
    const embed = this.client.util.embed().setColor(color);

    if (args.guild.iconURL) {
        // Support for Discord.js master.
        const url = typeof args.guild.iconURL === 'function'
        ? args.guild.iconURL('png', 1024)
        : args.guild.iconURL.replace('.jpg', '.png?size=1024');

        embed.setThumbnail(url);
    }

    const fields = [
        [
            'Guild Information',
            [
                `**Name**: ${args.guild.name}`,
                `**Guild ID**: ${args.guild.id}`,
                `**Verification**: ${['None', 'Low', 'Medium', '(╯°□°）╯︵ ┻━┻'][args.guild.verificationLevel]}`
            ],
            true
        ],
        [
            'Guild Counts',
            [
                `**Members**: ${args.guild.memberCount}`,
                `**Channels**: ${args.guild.channels.size}`,
                `**Emojis**: ${args.guild.emojis.size}`
            ],
            true
        ],
        [
            'Guild Membership',
            [
                `**Joined At**: ${moment(args.guild.joinedAt).utc().format('dddd, MMMM Do YYYY, h:mm:ss a')}`,
                `**Created At**: ${moment(args.guild.createdAt).utc().format('dddd, MMMM Do YYYY, h:mm:ss a')}`,
                `**Roles**: ${(() => {
                    if ((message.guild && message.guild.id) !== args.guild.id) return 'Outside of guild, cannot view roles.';
                    const roles = args.guild.roles.map(r => r.toString()).join(', ');
                    if (roles.length > 1024) return 'A lot of roles!';
                    return roles;
                })()}`
            ]
        ]
    ];

    for (const field of fields) embed.addField(...field);
    return message.edit({ embed });
}

module.exports = new Command('guild', exec, {
    aliases: ['guild', 'server'],
    args: [
        {
            id: 'guild',
            type: 'guild',
            default: m => m.guild || m.client.guilds.random()
        }
    ],
    clientPermissions: ['EMBED_LINKS'],
    category: 'info'
});
