'use strict';

const exressSetUp = require('./config/express');
const { sequelize } = require('../models')

const PORT = 3000;
const HOST = '0.0.0.0';

const app = exressSetUp();

async function main() {
  try {
      await sequelize.sync({ force: true })
      await sequelize.authenticate();
      console.log('Database synced')
      app.listen(PORT, HOST);
      console.log(`Running on http://${HOST}:${PORT}`);
  } catch (err) {
      console.log('Unable to connect to Postgres', err);
  }
}

main();
