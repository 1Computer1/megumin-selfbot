const { Inhibitor } = require('discord-akairo');
const Logger = require('../util/Logger');


function exec(message) {
    if (!message.guild) return false;

    if (message.isMemberMentioned(message.guild.me)) {
        /*if (this.client.avatar.avatar === true) {
            this.client.user.setAvatar('./src/data/avatar/avatar0.jpg').then(() =>{
                this.client.avatar.avatar = false;
                Logger.info('Spooky all gone');
            }).catch(() => {
                Logger.info('Cannot be spooked right now, brb in 10 mins');
                setTimeout(() => {
                    this.client.user.setAvatar('./src/data/avatar/avatar0.jpg').catch(console.error());
                    Logger.info('Spooky all gone');
                }, 600000);
            });
        }*/
        message.guild.fetchMember(message.author).then(member => {
            Logger.info(`You were mentioned by ${member.displayName}, id: ${message.author.id} in channel ${message.channel.name} for server ${message.guild.name}.`);
        });
    }
    return false;
}

module.exports = new Inhibitor('mentionned', exec, {
    reason: 'mention',
    type: 'all'
});
