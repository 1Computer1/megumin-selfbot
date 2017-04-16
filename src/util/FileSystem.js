const fs = require('fs');

class FileSystem {
    static mkdir(path) {
        return new Promise((resolve, reject) => {
            fs.mkdir(path, err => {
                if (err && err.code !== 'EEXIST') return reject(err);
                return resolve();
            });
        });
    }

    static writeFile(path, data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, data, err => {
                if (err) return reject(err);
                return resolve();
            });
        });
    }
}

module.exports = FileSystem;
