'use strict';

const exressSetUp = require('./config/express');
const { sequelize } = require('../models')
// const logger = require('./config/logger')

const PORT = 3000;
const HOST = '0.0.0.0';

const app = exressSetUp();

async function main() {
  try {
      await sequelize.sync({ force: true })
      await sequelize.authenticate();
      console.log('Database synced')
      app.listen(PORT, HOST);
      // logger.info(`Running on http://${HOST}:${PORT}`);
  } catch (err) {
      console.log('Unable to connect to Postgres', err);
  }
}

main();
