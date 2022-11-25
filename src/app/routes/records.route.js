const express = require('express');
const router = express.Router({mergeParams: true});

const recordController = require('../controllers/records.controller');


router.route('/')
    .post(recordController.createRecord)
    .get(recordController.readAllRecords);
    
module.exports = router;    

