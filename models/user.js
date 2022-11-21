'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining asso ciations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate( { Record }) {
      // define association here
      this.hasMany(Record, { foreignKey: 'userId' })
    }
    
    toJSON() {
      return { ...this.get(), id: undefined }
    }

  }
  User.init({
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV1},
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    firstName:  { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false } //PASSWORD hash
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User'
  });
  return User;
};