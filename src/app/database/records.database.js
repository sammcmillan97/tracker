const { Op } = require('sequelize');
const { Record } = require('../../../models')


const create = async function(recordBody){
    try {
        const record = await Record.create(recordBody);
        return record;
    } catch (err) {
        return err;
    }
 }

 const readAll = async function(queryBody) {
    try {
        const whereClause = buildWhereClause(queryBody);
        const records = await Record.findAll(whereClause);
        return records;
    } catch (err) {
        return err;
    }
 }

 const buildWhereClause = function(queryBody) {
    var whereCondition = { where : {} };
    if(queryBody.hasOwnProperty("fromDate")) {
        whereCondition.where.start = { [Op.gte] : new Date(queryBody.fromDate) }
    }
    if(queryBody.hasOwnProperty("toDate")) {
        whereCondition.where.end = { [Op.lte] : new Date(queryBody.toDate) }
    }
    if(queryBody.hasOwnProperty("fromProd")) {
        whereCondition.where.productivity = { [Op.gte] : queryBody.productivity }
    }
    if(queryBody.hasOwnProperty("toProd")) {
        whereCondition.where.productivity = { [Op.lte] :  queryBody.productivity}
    }
    if(queryBody.hasOwnProperty("fromEn")) {
        whereCondition.where.enjoyment = { [Op.gte] : queryBody.enjoyment }
    }
    if(queryBody.hasOwnProperty("toEn")) {
        whereCondition.where.enjoyment = { [Op.lte] :  queryBody.enjoyment}
    }
    if(queryBody.hasOwnProperty("userId")) {
        whereCondition.where.userId = { [Op.eq] : queryBody.userId}
    }
    if(queryBody.hasOwnProperty("categoryId")) {
        whereCondition.where.userId = { [Op.eq] : queryBody.categoryId}
    }
    return whereCondition;
 }

 module.exports = {
    create,
    readAll
 }