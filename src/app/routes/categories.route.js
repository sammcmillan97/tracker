const express = require('express');
const router = express.Router({mergeParams: true});

const categoryController = require('../controllers/categories.controller');


router.route('/')
    .post(categoryController.createCategory)
    .get(categoryController.getAllCategories);

router.route('/:id')
    .get(categoryController.getCategory)
    .patch(categoryController.updateCategory)
    .delete(categoryController.removeCategory);
    
module.exports = router;    

