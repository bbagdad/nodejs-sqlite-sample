(function () {
    const sqlite3 = require('sqlite3').verbose();
    const Promise = require('promise');
    const self = {};

    let database;
    let isInitialised = false;

    function getDb() {
        return new Promise((resolve, reject) => {
            if (!database || !database.open) {
                database = new sqlite3.Database('./db.db', sqlite3.OPEN_READWRITE, (err) => {
                    if (err) {
                        console.error(err.message);
                        isInitialised = false;
                        reject();
                    } else {
                        console.log('Connected to the NodeJsExpress database.');
                        isInitialised = true;
                        resolve();
                    }
                });
            } else {
                resolve();
            }
        });
    }

    self.select = function (query) {
        return new Promise((resolve, reject) => {
            getDb().then(() => {
                database.serialize(() => {
                    database.all(query, function (err, rows) {
                        resolve(rows);
                    });
                });
            });
            database.close();
        });
    }

    self.insert = function (fname, lname, email) {
        return new Promise((resolve, reject) => {
            getDb().then(() => {
                database.run(
                    `INSERT INTO Contacts(fname, lname, email) VALUES(?, ?, ?)`,
                    [fname, lname, email],
                    function (err) {
                        if (err) {
                            throw new Error('Could Not Add Row');
                        }
                        resolve(this.lastID);
                    }
                )
            });
            database.close();
        });
    }

    module.exports = self;
}());