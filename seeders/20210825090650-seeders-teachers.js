'use strict';
const fs = require("fs")
const {hashPassword} = require("../helpers/bycript")

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let data = JSON.parse(fs.readFileSync("./data-seed/teachers.json", "utf-8"))
    data.forEach(el => {
        el.password = hashPassword(el.password)
        el.createdAt = new Date()
        el.updatedAt = new Date()
    });
    return queryInterface.bulkInsert("Teachers", data)
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete("Teachers", null, {})
  }
};
