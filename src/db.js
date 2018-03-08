(function () {
    const sqlite3 = require('sqlite3').verbose();
    const Promise = require('promise');
    const self = {};

    let database;
    let isInitialised = false;

    function getDb() {
        return new Promise((resolve, reject) => {
            if (!database || !database.open) {
                database = new sqlite3.Database('./src/assets/db.db', sqlite3.OPEN_READWRITE, function (err) {
                    if (err) {
                        isInitialised = false;
                        reject(err);
                    } else {
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
                database.all(query, function (err, rows) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            });
            database.close();
        });
    }

    self.selectById = function (table, field, value) {
        return new Promise((resolve, reject) => {
            getDb().then(() => {
                database.get(`SELECT * FROM ${table} WHERE ${field} = '${value}'`, function (err, row) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(row);
                    }
                });
            });
            database.close();
        });
    }

    self.insertContact = function (contact) {
        return new Promise((resolve, reject) => {
            getDb().then(() => {
                database.run(
                    `INSERT INTO Contacts(fname, lname, email) VALUES(?, ?, ?)`,
                    [contact.fname, contact.lname, contact.email],
                    function (err) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(this.lastID);
                        }
                    }
                )
            });
            database.close();
        });
    }

    self.updateContact = function (contact, id) {
        return new Promise((resolve, reject) => {
            getDb().then(() => {
                database.run(
                    `UPDATE Contacts SET fname = ?, lname = ?, email = ? WHERE id = ?`,
                    [contact.fname, contact.lname, contact.email, id],
                    function (err) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(this.changes);
                        }
                    }
                )
            });
            database.close();
        });
    }

    self.deleteContactById = function (id) {
        return new Promise((resolve, reject) => {
            getDb().then(() => {
                database.run(`DELETE FROM Contacts WHERE id = ?`, id, function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(this.changes);
                    }
                });
            });
            database.close();
        });
    }

    module.exports = self;
}());