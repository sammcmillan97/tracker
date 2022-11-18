const express = require('express');
const router = express.Router({mergeParams: true});

const userController = require('../controllers/user.server.controller');


router.route('/')
    .get(userController.get);


module.exports = router;    

