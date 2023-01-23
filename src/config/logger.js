const pino = require('pino');

let logger = pino();

const options = {
  level: 'info',
  translateTime: true
};
logger = pino(options);

module.exports = logger; 