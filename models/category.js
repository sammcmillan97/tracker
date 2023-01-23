'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate( { Record }) {
      this.hasMany(Record, { foreignKey: 'categoryId' })
    }
  }
  Category.init({
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV1},
    name: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { len: [1, 30]}},
  }, {
    sequelize,
    tableName: 'categories',
    modelName: 'Category',
  });
  return Category;
};