'use strict';

const { Sequelize } = require('sequelize');

const state = {
    sequelize: null
};


module.exports = async function connect() {
    console.log("inside connect")
    state.sequelize = new Sequelize('postgres://tester:user@postgres:5432/tracker')
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
    console.error('Unable to connect to the database:', error);
    }
};

modeule.exports = function getSequelize()  {
    return state.sequelize
}



