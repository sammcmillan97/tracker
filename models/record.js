'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Record extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate( { User, Category }) {
      this.belongsTo(Category, {foreignKey: 'categoryId'}),
      this.belongsTo(User, { foreignKey: 'userId' })
    }
  }
  Record.init({
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV1},
    description: { type: DataTypes.STRING, allowNull: false },
    notes: { type: DataTypes.TEXT, allowNull: false },
    start: { type: DataTypes.DATE, allowNull: false },
    end: { type: DataTypes.DATE, allowNull: false },
    enjoyment: { type: DataTypes.INTEGER, allowNull: false, validate : {min: 1, max: 10}},
    productivity: { type: DataTypes.INTEGER, allowNull: false, validate : {min: 1, max: 10}},
  }, {
    sequelize,
    tableName: 'records',
    modelName: 'Record',
  });
  return Record;
};