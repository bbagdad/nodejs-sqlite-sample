(function () {
    const db = require('./db');
    const fs = require('fs');
    const Promise = require('promise');
    const self = {};

    self.getForm = function () {
        return new Promise((resolve, reject) => {
            fs.readFile('./src/assets/form.json', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(data));
                }
            });
        });
    }

    self.insertContact = function (obj) {
        return new Promise((resolve, reject) => {
            if (!obj || !obj.fname || !obj.lname || !obj.email) {
                reject("Object missing keys");
            } else {
                db.insertContact(obj)
                    .then(data => {
                        resolve(data)
                    }, err => {
                        reject(err);
                    })
            }
        });
    }

    self.updateContact = function (obj, id) {
        return new Promise((resolve, reject) => {
            if (!obj || !id || !obj.fname || !obj.lname || !obj.email) {
                reject("Object missing keys");
            } else {
                db.updateContact(obj, id)
                    .then(data => {
                        resolve(data)
                    }, err => {
                        reject(err);
                    })
            }
        });
    }

    self.deleteContactById = function (id) {
        return new Promise((resolve, reject) => {
            if (!id) {
                reject("id is required");
            } else {
                db.deleteContactById(id)
                    .then(data => {
                        resolve(data)
                    }, err => {
                        reject(err);
                    })
            }
        });
    }

    self.getContacts = function () {
        return db.select('SELECT * FROM Contacts');
    }

    self.getContactById = function (id) {
        return db.selectById('Contacts', 'id', id);
    }

    self.submitDialog = function (obj) {
        return new Promise((resolve, reject) => {
            if (!obj || !obj.fname || !obj.lname || !obj.email) {
                reject("Object missing keys");
            } else {
                db.inserContact(obj)
                    .then(data => resolve(data), err => {
                        reject(err);
                    })
            }
        });
    }

    module.exports = self;
}());