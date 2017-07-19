const { Command } = require('discord-akairo');
const moment = require('moment');

const Logger = require('../../util/Logger');

class GuildCommand extends Command {
    constructor() {
        super('guild', {
            aliases: ['guild', 'server'],
            category: 'discord',
            clientPermissions: ['EMBED_LINKS'],
            args: [
                {
                    id: 'guild',
                    type: 'guild',
                    default: m => m.guild
                }
            ]
        });
    }

    exec(message, { guild }) {
        if (!guild) {
            Logger.error('No guild provided.');
            return message.delete();
        }

        const color = this.client.getColor(message);
        const embed = this.client.util.embed().setColor(color);

        if (guild.iconURL()) {
            embed.setThumbnail(guild.iconURL());
        }

        const fields = [
            [
                'Guild Information',
                [
                    `**Name**: ${guild.name}`,
                    `**Guild ID**: ${guild.id}`,
                    `**Verification**: ${['None', 'Low', 'Medium', '(╯°□°）╯︵ ┻━┻'][guild.verificationLevel]}`
                ],
                true
            ],
            [
                'Guild Counts',
                [
                    `**Members**: ${guild.memberCount}`,
                    `**Channels**: ${guild.channels.size}`,
                    `**Emojis**: ${guild.emojis.size}`
                ],
                true
            ],
            [
                'Guild Membership',
                [
                    `**Joined At**: ${moment(guild.joinedAt).utc().format('dddd, MMMM Do YYYY, h:mm:ss a')}`,
                    `**Created At**: ${moment(guild.createdAt).utc().format('dddd, MMMM Do YYYY, h:mm:ss a')}`,
                    `**Roles**: ${(() => {
                        if ((message.guild && message.guild.id) !== guild.id) return 'Outside of guild, cannot view roles.';
                        const roles = guild.roles.map(r => r.toString()).join(', ');
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

module.exports = GuildCommand;
