const userAccess = require('../database/users.database');
const validator = require('../util/validation');

const getUser = async function(req, res){
    const id = req.params.id;
    //Validation
    if(!validator.checkIfValidUUID(id)) {
        return res.status(400).send("Invalid user ID format");
    }
    try {
        const user = await userAccess.read(id);
        if(user == null) {
            return res.status(404).send("User not found");
        }
        return res.status(200).json(user); 

    } catch {
        return res.status(500).send("Internal Server Error");
    }
}

//todo// hash password
const registerUser = async function(req, res){
    try {
    //Validation
        if(!req.body.hasOwnProperty("email") 
        || !req.body.hasOwnProperty("username") 
        || !req.body.hasOwnProperty("firstName") 
        || !req.body.hasOwnProperty("lastName") 
        || !req.body.hasOwnProperty("password")) {
            return res.status(400).send("Request body missing required parameters");
        }
        const userData = req.body;
        if(!validator.checkIfValidEmail(userData.email)) {
            return res.status(400).send("Invalid email format");
        }
        if(!validator.checkStringLength(userData.username, 1, 30)) {
            return res.status(400).send("Invalid username format: Username must have a length between 1 and 30 characters")
        }
        if(!validator.checkStringLength(userData.firstName, 1, 30) || !validator.checkIfValidWord(userData.firstName)) {
            return res.status(400).send("Invalid first name format: First name must have a length between 1 and 30 characters and contain no special characters")
        }
        if(!validator.checkStringLength(userData.lastName, 1, 30) || !validator.checkIfValidWord(userData.secondName)) {
            return res.status(400).send("Invalid last name format: Last name have a length between 1 and 30 characters and contain no special characets")
        }
        const user = await userAccess.create(userData);
        if (user.name == "SequelizeUniqueConstraintError" || user.name == "SequelizeValidationError") {
            return res.status(400).send(user.errors[0].message);
        }
        return res.status(201).json(user);
    } catch {
        return res.status(500).send("Internal Server Error");    
    }
}

module.exports = {
    registerUser,
    getUser
};