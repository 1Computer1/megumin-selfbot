const { Command } = require('discord-akairo');
const moment = require('moment');

function exec(message, args){
    if (!message.guild){
        this.client.logger.log(3, 'Must be in a guild to check a user\'s information.');
        return message.delete();
    }

    const color = this.client.color(message);

    const embed = this.client.util.embed()
    .setColor(color)
    .setTitle('User Information')
    .setThumbnail(args.member.user.displayAvatarURL.replace('.jpg?size=1024', '.png?size=1024'));

    const fields = [
        [
            'Username',
            `${args.member.user.username}#${args.member.user.discriminator}`,
            true
        ],
        [
            'Nickname',
            args.member.displayName,
            true
        ],
        [
            'Identifier',
            args.member.id,
            true
        ],
        [
            'Status',
            args.member.presence.status[0].toUpperCase() + args.member.presence.status.slice(1),
            true
        ],
        [
            'Game',
            args.member.presence.game && args.member.presence.game && args.member.presence.game.name || 'Not playing a game.',
            true
        ],
        [
            'Color',
            this.client.util.displayHexColor(args.member).toUpperCase(),
            true
        ],
        [
            'Roles',
            (() => {
                const roles = args.member.roles.map(r => r.toString()).join(', ');
                if (roles.length > 1024) return 'A lot of roles!';
                return roles;
            })()
        ],
        [
            'Joined At',
            moment(args.member.joinedAt).utc().format('dddd, MMMM Do YYYY, h:mm:ss a')
        ],
        [
            'Created At',
            moment(args.member.user.createdAt).utc().format('dddd, MMMM Do YYYY, h:mm:ss a')
        ]
    ];

    for (const field of fields) embed.addField(...field);
    return message.edit('', { embed });
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
    category: 'info'
});
