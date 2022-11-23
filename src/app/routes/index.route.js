const express = require('express');
const users = require('./users.route')
const records = require('./records.route')
const categories = require('./categories.route');

const router = express.Router();

router.use('/users', users);
router.use('/records', records);
router.use('/categories', categories);

module.exports = router;