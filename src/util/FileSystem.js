const fs = require('fs');

class FileSystem {
    /**
     * Makes a directory.
     * @param {string} path - Path to directory.
     * @returns {Promise<void>}
    */
    static mkdir(path) {
        return new Promise((resolve, reject) => {
            fs.mkdir(path, err => {
                if (err && err.code !== 'EEXIST') return reject(err);
                return resolve();
            });
        });
    }

    /**
     * Writes to file.
     * @param {string} path - Path to file.
     * @param {any} data - Data to write.
     * @returns {Promise<void>}
    */
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
