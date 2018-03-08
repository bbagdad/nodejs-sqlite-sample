(function () {
    const express = require('express');
    const app = express();

    const api = require('./api');
    const config = require('./config');

    config.configure(app);

    api.makeRoutes(app);

    config.listen(app, 3000);
}());