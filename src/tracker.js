'use strict';

const express = require('express');
const connect = require('./config/db');


const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();

async function main() {
  try {
      connect();
      app.listen(PORT, HOST);
      console.log(`Running on http://${HOST}:${PORT}`);
  } catch (err) {
      console.log('Unable to connect to Postgres');
  }
}

main();
