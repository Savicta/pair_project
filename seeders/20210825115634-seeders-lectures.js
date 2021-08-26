'use strict';
const fs = require("fs")

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
     let data = JSON.parse(fs.readFileSync("./data-seed/lectures.json", "utf-8"))
     data.forEach(el => {
         el.time = new Date()
         el.createdAt = new Date()
         el.updatedAt = new Date()
     });
     return queryInterface.bulkInsert("Lectures", data)
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete("Lectures", null, {})
  }
};
