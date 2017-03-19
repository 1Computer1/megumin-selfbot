const { Command } = require('discord-akairo');
const moment = require('moment');

function exec(message, args) {
    if (!args.guild) {
        this.client.logger.log(3, 'Must be in a guild to check its information.');
        return message.delete();
    }

    const color = this.client.color(message);
    const embed = this.client.util.embed()
    .setColor(color)
    .setTitle('Guild Information');

    if (args.guild.iconURL) embed.setThumbnail(args.guild.iconURL);

    const fields = [
        [
            'Name',
            args.guild.name,
            true
        ],
        [
            'Identifier',
            args.guild.id,
            true
        ],
        [
            'Verification',
            ['None', 'Low', 'Medium', '(╯°□°）╯︵ ┻━┻'][args.guild.verificationLevel],
            true
        ],
        [
            'Members',
            args.guild.memberCount,
            true
        ],
        [
            'Channels',
            args.guild.channels.size,
            true
        ],
        [
            'Emojis',
            args.guild.emojis.size,
            true
        ],
        [
            'Roles',
            (() => {
                const roles = args.guild.roles.map(r => r.toString()).join(', ');
                if (roles.length > 1024) return 'A lot of roles!';
                return roles;
            })()
        ],
        [
            'Joined At',
            moment(args.guild.joinedAt).utc().format('dddd, MMMM Do YYYY, h:mm:ss a')
        ],
        [
            'Created At',
            moment(args.guild.createdAt).utc().format('dddd, MMMM Do YYYY, h:mm:ss a')
        ]
    ];

    for (const field of fields) embed.addField(...field);
    return message.edit('', { embed });
}

module.exports = new Command('guild', exec, {
    aliases: ['guild', 'server'],
    args: [
        {
            id: 'guild',
            type: 'guild',
            default: m => m.guild
        }
    ],
    category: 'info'
});
