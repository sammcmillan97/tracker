const express = require('express');
const users = require('./users.route')
const records = require('./records.route')

const router = express.Router();

router.use('/users', users);
router.use('/records', records);

module.exports = router;