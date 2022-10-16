'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('orders', [
      {
        id: '0be65d19-5438-4a2d-a267-a031ea932dbc',
        buyer_id: '78444cea-19f1-4fef-b94a-3837e67677e4',
        created_on: new Date(2021, 0, 1),
        updated_on: new Date(2021, 0, 1)
      },
      {
        id: '368c3422-3f99-4584-8b60-d0b8c3b87491',
        buyer_id: '78444cea-19f1-4fef-b94a-3837e67677e4',
        created_on: new Date(2021, 1, 1),
        updated_on: new Date(2021, 1, 1)
      },
      {
        id: 'c3e004b0-1c58-42dc-93b1-28d72b5d28e4',
        buyer_id: '78444cea-19f1-4fef-b94a-3837e67677e4',
        created_on: new Date(2022, 0, 1),
        updated_on: new Date(2022, 0, 1)
      },
      {
        id: '6a00635e-77e5-4d3b-ba47-7f13a821d38b',
        buyer_id: '78444cea-19f1-4fef-b94a-3837e67677e4',
        created_on: new Date(2022, 1, 1),
        updated_on: new Date(2022, 1, 1)
      },
      {
        id: '60515a93-a7b6-4f30-a56f-a0e386c2e1f9',
        buyer_id: '78444cea-19f1-4fef-b94a-3837e67677e4',
        created_on: new Date(2022, 2, 1),
        updated_on: new Date(2022, 2, 1)
      },
      {
        id: 'c3a2fcc4-bfde-4812-9de7-2be43175c712',
        buyer_id: '54c8fbe1-4421-4465-b1c3-179aed082d69',
        created_on: new Date(2022, 3, 1),
        updated_on: new Date(2022, 3, 1)
      },
      {
        id: 'a8f8741a-df1c-4fd3-a866-a19700853af6',
        buyer_id: '54c8fbe1-4421-4465-b1c3-179aed082d69',
        created_on: new Date(2022, 4, 1),
        updated_on: new Date(2022, 4, 1)
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('orders', null, {});
  }
};
