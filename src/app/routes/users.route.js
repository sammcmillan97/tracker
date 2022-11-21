const express = require('express');
const router = express.Router({mergeParams: true});

const userController = require('../controllers/users.controller');


router.route('/')
    .post(userController.create);

router.route('/:id')
    .get(userController.get);

    
module.exports = router;    

