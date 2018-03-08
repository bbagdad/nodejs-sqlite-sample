(function () {
    const manager = require('./manager');
    const self = {};

    self.makeRoutes = function (app) {
        app.get('/Contacts', function (req, res) {
            manager.getContacts().then(data => {
                res.send(data);
            }, err => {
                res.status(400).send(err);
            });
        });

        app.get('/Contacts/:id', function (req, res) {
            manager.getContactById(req.params.id).then(data => {
                res.send(data);
            }, err => {
                res.status(400).send(err);
            });
        });

        app.post('/SubmitDialog', function (req, res) {
            res.send(req.body);
        });

        app.post('/SubmitContact/:id?', function (req, res) {
            if (req.params.id) {
                manager.updateContact(req.body, req.params.id).then(data => {
                    res.json(data);
                }, err => {
                    res.status(400).send(err);
                });
            } else {
                manager.insertContact(req.body).then(data => {
                    res.json({ ID: data });
                }, err => {
                    res.status(400).send(err);
                });
            }
        });
        app.delete('/DeleteContact/:id', function (req, res) {
            if (req.params.id) {
                manager.deleteContactById(req.params.id).then(data => {
                    res.json(data);
                }, err => {
                    res.status(400).send(err);
                });
            } else {
                res.status(400).send("ID Not Specified");
            }
        });

        app.get('/GetForm', function (req, res) {
            setTimeout(function () {
                manager.getForm().then(data => {
                    res.send(data);
                }, err => {
                    res.status(400).send(err);
                })
            }, 3000);
        });
    }

    module.exports = self;
}());