const { Command } = require('discord-akairo');
const moment = require('moment');

class UserCommand extends Command {
    constructor() {
        super('user', {
            aliases: ['user', 'member', 'whois'],
            category: 'discord',
            channel: 'guild',
            clientPermissions: ['EMBED_LINKS'],
            args: [
                {
                    id: 'member',
                    match: 'content',
                    type: 'member',
                    default: message => message.member
                }
            ]
        });
    }

    exec(message, args) {
        const color = this.client.getColor(message);
        const embed = this.client.util.embed()
        .setColor(color)
        .setThumbnail(args.member.user.displayAvatarURL({ size: 2048 }));

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
                    `**Game**: ${(args.member.presence.game && args.member.presence.game.name) || 'Not playing a game.'}`,
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
                        if (roles.length > 880) return 'A lot of roles!';
                        return roles;
                    })()}`
                ]
            ]
        ];

        for (const field of fields) embed.addField(...field);
        return message.edit({ embed });
    }
}

module.exports = UserCommand;
