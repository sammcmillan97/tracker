const recordAccess = require("../database/records.database");
const userAccess = require("../database/users.database");
const categoryAccess = require("../database/categories.database");
const validator = require("../util/validation");

const createRecord = async function(req, res){
    try {
        //validation
        if(!req.body.hasOwnProperty("description") 
        || !req.body.hasOwnProperty("notes") 
        || !req.body.hasOwnProperty("start") 
        || !req.body.hasOwnProperty("end")
        || !req.body.hasOwnProperty("enjoyment")
        || !req.body.hasOwnProperty("productivity")
        || !req.body.hasOwnProperty("userId")
        || !req.body.hasOwnProperty("categoryId")) {
            res.status(400).send("Request body missing required parameters");
        }
        if(!validator.checkStringLength(req.body.description, 0, 258)) {
            res.status(400).send("Invalid description format: Description must have a length between 0 and 258 characters");
        }
        if(!validator.checkEndDateAfterStartDate(req.body.start, req.body.end)) {
            res.status(400).send("Start date must be before end date");
        }
        console.log(req.body.enjoyment);
        if(isNaN(parseInt(req.body.enjoyment, 10))) {
            res.status(400).send("Enjoyment must be a number");
        }
        if(isNaN(parseInt(req.body.productivity, 10))) {
            res.status(400).send("Productivitiy must be a number");
        }
        if(parseInt(req.body.enjoyment, 10) < 0 || parseInt(req.body.enjoyment, 10) > 10) {
            res.status(400).send("Enjoyment must be 0 - 10");
        }
        if(parseInt(req.body.productivity, 10) < 0 || parseInt(req.body.productivity, 10) > 10) {
            res.status(400).send("Productivity must be 0 - 10");
        }
        if(!validator.checkIfValidUUID(req.body.userId)) {
            res.status(400).send("Invalid user ID format");
        }
        if(!validator.checkIfValidUUID(req.body.categoryId)) {
            res.status(400).send("Invalid category ID format");
        }
        const user = await userAccess.read(req.body.userId);
        if (user == null) {
            res.status(404).send("User not found");
        }
        const category = await categoryAccess.getOne(req.body.categoryId)
        if (category == null) {
            res.status(404).send("Category not found");
        }
        const recordBody = req.body;
        const record = await recordAccess.create(recordBody);
        return res.status(201).json(record);    
    } catch(err) {
        console.log(err)
        return res.status(500).send("Internal Server Error");
    }
}


const readAllRecords = async function (req, res) {
    try {
        //Validation
        if(req.query.hasOwnProperty("fromDate")) {
            if(isNaN(Date.parse(req.query.fromDate))) {
                res.status(400).send("Invalid start date format");
            }
        }
        if(req.query.hasOwnProperty("toDate")) {
            if(isNaN(Date.parse(req.query.toDate))) {
                res.status(400).send("Invalid start date format");
            }
        }
        if(req.query.hasOwnProperty("fromDate") && req.query.hasOwnProperty("toDate")) {
            if(!validator.checkEndDateAfterStartDate(req.query.fromDate, req.query.toDate)) {
            res.status(400).send("Start date must be before end date");
            }
        }
        if(req.query.hasOwnProperty("userId")) {
            if(!validator.checkIfValidUUID(req.query.userId)) {
                res.status(400).send("Invalid User ID fromat");
            }
            const user = await userAccess.read(req.body.userId);
            if (user == null) {
                res.status(404).send("User not found");
            }
        }
        if(req.query.hasOwnProperty("categoryId")) {
            if(!validator.checkIfValidUUID(req.query.categoryId)) {
                res.status(400).send("Invalid Category ID fromat");
            }
            const category = await categoryAccess.getOne(req.body.categoryId)
            if (category == null) {
                res.status(404).send("Category not found");
            }
        }
        if(req.query.hasOwnProperty("fromProd") && req.query.hasOwnProperty("toProd")) {
            if(req.query.toProd < req.query.fromProd) {
                res.status(400).send("Productivity min must be less then producitivty max");
            }
        }
        if(req.query.hasOwnProperty("fromEn") && req.query.hasOwnProperty("toEn")) {
            if(req.query.toEn < req.query.fromEn) {
                res.status(400).send("Enjoyment min must be less then Enjoyment max");
            }
        }
        if(req.query.hasOwnProperty("fromEn")) {
            if(parseInt(req.query.hasOwnProperty("fromEn"), 10) < 0 || parseInt(req.query.hasOwnProperty("fromEn"), 10) > 10) {
                res.status(400).send("Enjoyment must be 0 - 10");
            }
        }
        if(req.query.hasOwnProperty("toEn")) {
            if(parseInt(req.query.hasOwnProperty("toEn"), 10) < 0 || parseInt(req.query.hasOwnProperty("toEn"), 10) > 10) {
                res.status(400).send("Enjoyment must be 0 - 10");
            }
        }
        if(req.query.hasOwnProperty("fromProd")) {
            if(parseInt(req.query.hasOwnProperty("fromProd"), 10) < 0 || parseInt(req.query.hasOwnProperty("fromProd"), 10) > 10) {
                res.status(400).send("Productivity must be 0 - 10");
            }
        }
        if(req.query.hasOwnProperty("toProd")) {
            if(parseInt(req.query.hasOwnProperty("toProd"), 10) < 0 || parseInt(req.query.hasOwnProperty("toProd"), 10) > 10) {
                res.status(400).send("Productivity must be 0 - 10");
            }
        }
        const queryBody = req.query;
        const records = await recordAccess.readAll(queryBody);
        if (records == 0) {
            return res.status(404).send("No records in the database that match those query parameters");
        }
        console.log(records);
        return res.status(200).send(records);
    } catch(err) {
        console.log(err)
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = { 
    createRecord,
    readAllRecords
};