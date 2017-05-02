const { Command } = require('discord-akairo');
const moment = require('moment');

function exec(message, args) {
    const color = this.client.color(message);
    const embed = this.client.util.embed()
    .setColor(color)
    .setThumbnail(args.member.user.displayAvatarURL.replace('.jpg?size=1024', '.png?size=1024'));

    const fields = [
        [
            'User Information',
            [
                `**Username**: ${args.member.user.tag}`,
                `**Nickname**: ${args.member.displayName}`,
                `**User ID**: ${args.member.id}`
            ],
            true
        ],
        [
            'User Status',
            [
                `**Status**: ${args.member.presence.status[0].toUpperCase() + args.member.presence.status.slice(1)}`,
                `**Game**: ${(args.member.presence.game && args.member.presence.game && args.member.presence.game.name) || 'Not playing a game.'}`,
                `**Color**: ${args.member.displayHexColor.toUpperCase()}`
            ],
            true
        ],
        [
            'Guild Membership',
            [
                `**Joined At**: ${moment(args.member.joinedAt).utc().format('dddd, MMMM Do YYYY, h:mm:ss a')}`,
                `**Created At**: ${moment(args.member.user.createdAt).utc().format('dddd, MMMM Do YYYY, h:mm:ss a')}`,
                `**Roles**: ${(() => {
                    const roles = args.member.roles.map(r => r.toString()).join(', ');
                    if (roles.length > 1024) return 'A lot of roles!';
                    return roles;
                })()}`
            ]
        ]
    ];

    for (const field of fields) embed.addField(...field);
    return message.edit({ embed });
}

module.exports = new Command('user', exec, {
    aliases: ['user', 'member', 'whois'],
    args: [
        {
            id: 'member',
            match: 'content',
            type: 'member',
            default: message => message.member
        }
    ],
    channelRestriction: 'guild',
    clientPermissions: ['EMBED_LINKS'],
    category: 'info'
});
