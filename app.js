(function () {
    const express = require('express');
    const app = express();

    const api = require('./src/api');
    const config = require('./src/config');

    config.configure(app);

    api.makeRoutes(app);

    config.listen(app, 3000);
}());