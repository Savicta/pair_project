'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lecture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    formatInputDate() {
      let formattedDate = this.time.toISOString().split('T')
      return formattedDate[0]
    }
    static associate(models) {
      // define association here
      Lecture.belongsToMany(models.Student, {through: "Grade"})
      Lecture.belongsTo(models.Teacher, {foreignKey: "TeacherId"})
    }
  };
  Lecture.init({
    subject: DataTypes.STRING,
    time: DataTypes.DATE,
    TeacherId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Lecture',
  });
  return Lecture;
};