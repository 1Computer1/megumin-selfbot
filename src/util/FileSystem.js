const fs = require('fs');

function mkdir(path) {
    return new Promise((resolve, reject) => {
        fs.mkdir(path, err => {
            if (err && err.code !== 'EEXIST') return reject(err);
            return resolve();
        });
    });
}

function writeFile(path, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, err => {
            if (err) return reject(err);
            return resolve();
        });
    });
}

module.exports = {
    mkdir, writeFile
};
