'use strict';
const argon = require("argon2")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = await argon.hash('password')
    await queryInterface.bulkInsert('Users', [{
      fullName: 'dewa',
      email: 'dewa@mail.com',
      password: password
    }], {})
    /**
     * Add seed commands here.
     *
     * Example:
     * 
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
