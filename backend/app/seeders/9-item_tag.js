'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('item_tags', [{
      id: '0754b263-dfcd-482b-8450-7845d68e01ce',
      item_id: '846f4e5a-56bc-4649-b89e-17e07e81e70e',
      tag_id: '8b010fd0-b838-439f-81be-9116593960ed',
      created_on: new Date(),
      updated_on: new Date()
    },
    {
      id: 'cce96ab4-81cb-47e9-befc-228e0ee2ffe4',
      item_id: 'd8d4e79f-eea0-434a-a793-e528c3a10c9e',
      tag_id: '8b010fd0-b838-439f-81be-9116593960ed',
      created_on: new Date(),
      updated_on: new Date()
    },
    {
      id: 'fc2ba37c-b51f-4dd4-a6db-4638869f1200',
      item_id: 'a1ff0c49-7ff7-44f2-804b-ba7c47ef1012',
      tag_id: '8b010fd0-b838-439f-81be-9116593960ed',
      created_on: new Date(),
      updated_on: new Date()
    },
    {
      id: '03268eff-f85a-49a6-ac25-011c900aaf29',
      item_id: 'a7dd71f0-3d06-4982-bccd-5a95e85ab03f',
      tag_id: '8b010fd0-b838-439f-81be-9116593960ed',
      created_on: new Date(),
      updated_on: new Date()
    },
    {
      id: '9e1267b9-7f87-49fd-a890-1581da2293bd',
      item_id: '83ebc0a8-5fa3-457b-a0d1-142fc05ae79e',
      tag_id: '202f4c93-d098-40b4-bcbf-d9ff89bf7a9a',
      created_on: new Date(),
      updated_on: new Date()
    },
    {
      id: 'bf1fd572-9eca-4e2e-9a28-301f0afa8ddd',
      item_id: '0dbf8c46-b309-4ca0-906c-40e821170428',
      tag_id: '8a5cffc9-4c60-40e2-b94c-aec588b8f2ba',
      created_on: new Date(),
      updated_on: new Date()
    },
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('item_tags', null, {});
  }
};
