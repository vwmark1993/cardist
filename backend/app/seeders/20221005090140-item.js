'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('items', [{
      id: '846f4e5a-56bc-4649-b89e-17e07e81e70e',
      seller_id: '78444cea-19f1-4fef-b94a-3837e67677e4',
      images: ['https://i.ytimg.com/vi/fcP8rqxvx0E/maxresdefault.jpg', 'https://themagicwarehouse.com/ta5676.jpg', 'https://cdn.shopify.com/s/files/1/0013/7332/products/4fa13796a574d3.44348183_1.jpeg'],
      name: 'Theory11 Sentinels Playing Cards',
      description: 'Limited edition playing cards from Theory11.',
      price: 12.95,
      number_sold: 12,
      created_on: new Date(),
      updated_on: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('items', null, {});
  }
};
