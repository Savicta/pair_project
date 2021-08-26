'use strict';
const {
  Model
} = require('sequelize');
const {hashPassword} = require("../helpers/bycript")
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
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
        Student.belongsToMany(models.Lecture, {through: "Grade"})
    }
  };
  Student.init({
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    birth_date: DataTypes.DATEONLY,
    phone_number: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    discordId: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(instance) {
        instance.password = hashPassword(instance.password)
      }
    },
    sequelize,
    modelName: 'Student',
  });
  return Student;
};