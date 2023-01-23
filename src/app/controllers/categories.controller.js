const categoryAccess = require('../database/categories.database');
const validator = require('../util/validation');

const createCategory = async function(req, res){
    try {
        //Validation
        if(!req.body.hasOwnProperty("name")) {
            return res.status(400).send("Request body missing required parameters");
        }
        const categoryBody = req.body;
        if(!validator.checkIfValidWord(categoryBody.name) || !validator.checkStringLength(categoryBody.name, 1, 30)) {
            return res.status(400).send("Invalid name format: Name must have a length between 1 and 30 characters and contain no speical characters")
        }

        const category = await categoryAccess.create(categoryBody);
        if (category.name == "SequelizeUniqueConstraintError" || category.name == "SequelizeValidationError") {
            return res.status(400).send(category.errors[0].message);
        }
        return res.status(201).json(category);
    } catch(err) {
        return res.status(500).send("Internal Server Error");
    }
}

const getCategory = async function(req, res){
    try {
        const id = req.params.id;
        //Validation
        if(!validator.checkIfValidUUID(id)) {
            return res.status(400).send("Invalid user ID format");
        }

        const category = await categoryAccess.getOne(id);
        if(category == null) {
            return res.status(404).send("Category not found");
        }  
        return res.status(200).json(category);
    } catch (err) {
        return res.status(500).send("Internal Server Error");
    }
}

const getAllCategories = async function(req, res){
    try {
        const categories = await categoryAccess.getAll();
        if (categories == 0) {
            return res.status(404).send("No Categories in the database");
        } else {
            return res.status(200).json(categories);
        }
    } catch (err) {
        return res.status(500).send("Internal Server Error");
    }
}

const removeCategory = async function(req, res){
    try {
        const id = req.params.id;
        //Validation
        if(!validator.checkIfValidUUID(id)) {
            return res.status(400).send("Invalid category ID format");
        }

        const category = await categoryAccess.remove(id);
        if (category == null) {
            return res.status(404).send("Category not found");
        }
        return res.status(200).send("Category: " + category.name + " deleted");
    } catch (err) {
        return res.status(500).send("Internal Server Error");
    }
}

const updateCategory = async function(req, res) {
    try {
        const id = req.params.id;
        //Validation
        if(!validator.checkIfValidUUID(id)) {
            return res.status(400).send("Invalid user ID format");
        }
        if(!req.body.hasOwnProperty("name")) {
            return res.status(400).send("Missing body parameters");
        }
        const categoryBody = req.body;
        if(!validator.checkIfValidWord(categoryBody.name) || !validator.checkStringLength(categoryBody.name, 1, 30)) {
            return res.status(400).send("Invalid name format: Name must have a length between 1 and 30 characters and contain no speical characters")
        }
        const category = await categoryAccess.update(id, categoryBody);
        if (category == "Not Found") {
            return res.status(404).send("Category not found");
        }
        if (category == null) {
            return res.status(400).send("Category name must be unique");
        }
        if (category.name == "SequelizeUniqueConstraintError" || category.name == "SequelizeValidationError") {
            return res.status(400).send(user.errors[0].message);
        }
        return res.status(200).send("Category: " + categoryBody.name + " updated");
    } catch (err) {
        return res.status(500).send(err);
    }
}   

module.exports = {
    createCategory,
    getCategory,
    getAllCategories,
    removeCategory,
    updateCategory
};