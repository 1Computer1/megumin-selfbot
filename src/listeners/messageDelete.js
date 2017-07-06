const { Listener } = require('discord-akairo');

function exec(message) {
    // Get current channel and message content (as well as author)
    // Check if reached max allowed delete messages in that channel
    // channelId:[{"author":XXXXX, "content":XXXXX},....]

    let cache = this.client.deleteCache[message.channel.id];
    if (!cache) {
        cache = new Array({ author: message.author.username, content: message.content });
    } else if (cache.length > 0) {
        cache.unshift({ author: message.author.tag, content: message.content });
        if (cache.length > 10) {
            cache.splice(-1, 1);
        }
    }
    this.client.deleteCache[message.channel.id] = cache;
}


module.exports = new Listener('messageDelete', exec, {
    emitter: 'client',
    eventName: 'messageDelete',
    category: 'client'
});
