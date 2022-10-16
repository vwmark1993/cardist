'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('comments', [{
      id: 'e7e3d786-d6ba-43dd-9528-3a3b9c9f1bcb',
      user_id: '78444cea-19f1-4fef-b94a-3837e67677e4',
      item_id: '846f4e5a-56bc-4649-b89e-17e07e81e70e',
      message: 'Great purchase!',
      flagged: false,
      flagged_reason: null,
      flagged_reason_message: null,
      created_on: new Date(),
      updated_on: new Date()
    },
    {
      id: '5e133c41-7ccc-4899-b7d2-231701097c85',
      user_id: '54c8fbe1-4421-4465-b1c3-179aed082d69',
      item_id: '846f4e5a-56bc-4649-b89e-17e07e81e70e',
      message: 'I love these cards!',
      flagged: false,
      flagged_reason: null,
      flagged_reason_message: null,
      created_on: new Date(),
      updated_on: new Date()
    },
    {
      id: '3152e431-c3ea-445a-b00f-ca9e53acb8e5',
      user_id: '54c8fbe1-4421-4465-b1c3-179aed082d69',
      item_id: 'd8d4e79f-eea0-434a-a793-e528c3a10c9e',
      message: 'High quality product',
      flagged: false,
      flagged_reason: null,
      flagged_reason_message: null,
      created_on: new Date(),
      updated_on: new Date()
    }
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('comments', null, {});
  }
};
