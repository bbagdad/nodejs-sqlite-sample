(function () {
    const fs = require('fs');
    const db = require('./db');
    const self = {};

    self.makeRoutes = function (app) {
        app.get('/GetQuery', function (req, res) {
            db.select('SELECT * FROM Contacts').then(data => {
                res.send(data);
            });
        });

        app.post('/SubmitDialog', function (req, res) {
            console.log(req.body);
            res.send(req.body);
        });

        app.post('/SubmitForm', function (req, res) {
            console.log(req.body);
            db.insert(req.body.fname, req.body.lname, req.body.email).then(data => {
                res.json({ ID: data });
            });
        });

        app.get('/GetForm', function (req, res) {
            fs.readFile('./form.json', (err, data) => {
                if (err) throw err;
                res.send(JSON.parse(data));
            });
        });
    }

    module.exports = self;
}());