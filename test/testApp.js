const exressSetUp = require('../src/config/express');

const PORT = 3000;
const HOST = '0.0.0.0';

let app = exressSetUp();
app.listen(PORT, HOST);

module.exports = {
    app
}