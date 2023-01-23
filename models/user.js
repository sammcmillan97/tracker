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
      return { ...this.get(), password: undefined }
    }

  }
  User.init({
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV1},
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true, len: [5, 254]} },
    username: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { len: [1, 30]}},
    firstName:  { type: DataTypes.STRING, allowNull: false, validate: { len: [1, 30]}},
    lastName: { type: DataTypes.STRING, allowNull: false, validate: { len: [1, 30]}},
    password: { type: DataTypes.STRING, allowNull: false, validate: {len: [8, 30]}} //PASSWORD hash
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User'
  });
  return User;
};