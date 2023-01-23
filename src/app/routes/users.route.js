const express = require('express');
const router = express.Router({mergeParams: true});

const userController = require('../controllers/users.controller');


router.route('/')
    .post(userController.registerUser);

router.route('/:id')
    .get(userController.getUser);

    
module.exports = router;    

