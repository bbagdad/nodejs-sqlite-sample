(function () {
    const express = require('express');
    const app = express();
    const bodyParse = require('body-parser');

    const self = {};

    self.configure = function (app) {
        app.use(bodyParse.json()); // support JSON encoded bodies;
        app.use(bodyParse.urlencoded({ extended: true })); // support encoded bodies;

        app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    }

    self.listen = function (app, port) {
        app.listen(port, () => console.log('NodeJsExpress app listening on port ' + port + '!'));
    }

    module.exports = self;
}());