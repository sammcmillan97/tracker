
const express = require('express');
const bodyParser = require('body-parser');

module.exports = function exressSetUp ()  {
    const app = express(); 
    app.use( bodyParser.json() ); 
    const routes = require('../app/routes/index.route');
    app.use(routes);
    return app;
};