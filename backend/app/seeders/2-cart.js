'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('carts', [{
      id: 'c9ab4f8f-d64c-4987-b2e9-e5a44542398b',
      user_id: 'af0e57a4-076f-4191-b7cd-5d48ba722372',
      total_price: 0.00,
      created_on: new Date(),
      updated_on: new Date()
    },
    {
      id: 'a6b6d22c-494b-4bd8-a89c-a639c4b1eac6',
      user_id: '78444cea-19f1-4fef-b94a-3837e67677e4',
      total_price: 0.00,
      created_on: new Date(),
      updated_on: new Date()
    },
    {
      id: 'a9f5b40d-d44e-42d3-bdd1-5c062aa89187',
      user_id: '54c8fbe1-4421-4465-b1c3-179aed082d69',
      total_price: 0.00,
      created_on: new Date(),
      updated_on: new Date()
    },
    {
      id: 'c98f0f4d-f010-47e4-98c6-d647d6a75a15',
      user_id: 'c5180103-834c-465f-bd2c-528fe5e6193e',
      total_price: 0.00,
      created_on: new Date(),
      updated_on: new Date()
    },
    {
      id: 'a95065b2-f3a1-4475-a543-fb045b4e2044',
      user_id: 'ecd6a4a3-a84c-4a13-9eba-36811a116e41',
      total_price: 0.00,
      created_on: new Date(),
      updated_on: new Date()
    },
    {
      id: 'f78f812b-89a7-485a-b42f-2c726d041523',
      user_id: '257cfb4c-0aa4-404e-b878-551964fc5046',
      total_price: 0.00,
      created_on: new Date(),
      updated_on: new Date()
    },
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('carts', null, {});
  }
};
