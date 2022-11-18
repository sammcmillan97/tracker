const express = require('express');
const users = require('./user.route')

const router = express.Router();

router.use('/users', users);

module.exports = router;