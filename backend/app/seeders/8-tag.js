'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('tags', [{
      id: '8a5cffc9-4c60-40e2-b94c-aec588b8f2ba',
      name: 'Condition - New',
      created_on: new Date(),
      updated_on: new Date()
    },
    {
      id: '202f4c93-d098-40b4-bcbf-d9ff89bf7a9a',
      name: 'Condition - Used',
      created_on: new Date(),
      updated_on: new Date()
    },
    {
      id: '8b010fd0-b838-439f-81be-9116593960ed',
      name: 'Limited Edition',
      created_on: new Date(),
      updated_on: new Date()
    }
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('tags', null, {});
  }
};
