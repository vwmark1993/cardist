'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // return queryInterface.bulkInsert('cart_items', []);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('cart_items', null, {});
  }
};
