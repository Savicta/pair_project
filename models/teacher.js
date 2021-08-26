'use strict';
const {
  Model
} = require('sequelize');
const {hashPassword} = require("../helpers/bycript")
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static formatName(name) {
      let data = name.split(" ")
      data = data.map((el) => {
        return el[0].toUpperCase() + el.slice(1).toLowerCase()
      })
      return data.join(" ")
    }
    
    static associate(models) {
      // define association here
      Teacher.hasMany(models.Lecture, {foreignKey: "TeacherId"})
    }
  };
  Teacher.init({
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    hooks: {
      beforeCreate(instance) {
        instance.password = hashPassword(instance.password)
      }
    },
    sequelize,
    modelName: 'Teacher',
  });
  return Teacher;
};