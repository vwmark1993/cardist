'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('banners', [{
      name: 'test',
      image: 'test',
      created_on: new Date(),
      updated_on: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('banners', null, {});
  }
};
