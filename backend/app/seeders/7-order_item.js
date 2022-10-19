'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('order_items', [
      {
        id: 'e38669c6-9627-4538-b1b9-73f1a0256f9e',
        order_id: '0be65d19-5438-4a2d-a267-a031ea932dbc',
        seller_id: '257cfb4c-0aa4-404e-b878-551964fc5046',
        item_id: '1c8a3e66-4212-45c9-8fd3-e7080ea995d8',
        quantity: 10,
        price: 6.75,
        created_on: new Date(2021, 0, 1),
        updated_on: new Date(2021, 0, 1)
      },
      {
        id: '88bacf60-29fc-4656-a2ea-b7b2fe2a8cd9',
        order_id: '368c3422-3f99-4584-8b60-d0b8c3b87491',
        seller_id: '257cfb4c-0aa4-404e-b878-551964fc5046',
        item_id: '83ebc0a8-5fa3-457b-a0d1-142fc05ae79e',
        quantity: 10,
        price: 6.75,
        created_on: new Date(2021, 1, 1),
        updated_on: new Date(2021, 1, 1)
      },
      {
        id: 'aeb11251-f11f-47d7-9661-9fd06f2359c2',
        order_id: 'c3e004b0-1c58-42dc-93b1-28d72b5d28e4',
        seller_id: '257cfb4c-0aa4-404e-b878-551964fc5046',
        item_id: '1c8a3e66-4212-45c9-8fd3-e7080ea995d8',
        quantity: 13,
        price: 6.75,
        created_on: new Date(2022, 0, 1),
        updated_on: new Date(2022, 0, 1)
      },
      {
        id: 'a4f47d1e-8578-44f1-822f-c0ab42af54c1',
        order_id: '6a00635e-77e5-4d3b-ba47-7f13a821d38b',
        seller_id: '257cfb4c-0aa4-404e-b878-551964fc5046',
        item_id: '83ebc0a8-5fa3-457b-a0d1-142fc05ae79e',
        quantity: 12,
        price: 6.75,
        created_on: new Date(2022, 1, 1),
        updated_on: new Date(2022, 1, 1)
      },
      {
        id: 'eab7f0da-7355-4f81-9ea7-8db00efb1e9d',
        order_id: '60515a93-a7b6-4f30-a56f-a0e386c2e1f9',
        seller_id: 'c5180103-834c-465f-bd2c-528fe5e6193e',
        item_id: 'd8d4e79f-eea0-434a-a793-e528c3a10c9e',
        quantity: 3,
        price: 23.95,
        created_on: new Date(2022, 2, 1),
        updated_on: new Date(2022, 2, 1)
      },
      {
        id: '3cae3e7b-7c9c-40b1-a52f-eb30115aeae8',
        order_id: 'c3a2fcc4-bfde-4812-9de7-2be43175c712',
        seller_id: 'ecd6a4a3-a84c-4a13-9eba-36811a116e41',
        item_id: '0dbf8c46-b309-4ca0-906c-40e821170428',
        quantity: 4,
        price: 12.99,
        created_on: new Date(2022, 3, 1),
        updated_on: new Date(2022, 3, 1)
      },
      {
        id: '7e496a16-b506-412c-9711-03ffe5217e0b',
        order_id: 'a8f8741a-df1c-4fd3-a866-a19700853af6',
        seller_id: 'ecd6a4a3-a84c-4a13-9eba-36811a116e41',
        item_id: '7eae9271-aa24-48f9-a337-93f7a9adfdf4',
        quantity: 3,
        price: 11.99,
        created_on: new Date(2022, 4, 1),
        updated_on: new Date(2022, 4, 1)
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('order_items', null, {});
  }
};
