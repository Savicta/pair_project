'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Grade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Grade.init({
    nilai: { 
      type: DataTypes.INTEGER,
      validate: {
        min:0,
        max:100
      }
    },
    komentar: DataTypes.STRING,
    StudentId: DataTypes.INTEGER,
    LectureId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Grade',
  });
  return Grade;
};