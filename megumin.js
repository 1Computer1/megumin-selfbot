const MeguminClient = require('./src/struct/MeguminClient');
const Logger = require('./src/util/Logger');

const config = require('./src/data/config.json');
const client = new MeguminClient(config);

client.start().then(() => {
    Logger.info('Megumin ready! Explooooooosion!');
});
