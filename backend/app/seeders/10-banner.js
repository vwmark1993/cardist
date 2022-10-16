'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('banners', [{
      id: '1e26d938-08d7-4e28-af92-9d02d48a1f45',
      name: 'Spring',
      image: 'http://thriftyprintables.com/wp-content/uploads/2019/03/Spring-banner-floral-1024x296.jpg',
      selected: true,
      created_on: new Date(),
      updated_on: new Date()
    },
    {
      id: 'c2c6a40d-f6cc-4477-b331-e0e351b173ad',
      name: 'Halloween',
      image: 'https://www.dytho.com/wp-content/uploads/2018/10/halloween-banner.jpg',
      selected: false,
      created_on: new Date(),
      updated_on: new Date()
    },
    {
      id: '91c661c6-9b59-42e7-ae79-7997f30de278',
      name: 'Christmas',
      image: 'https://t4.ftcdn.net/jpg/02/90/44/15/360_F_290441524_jFcgbi9vRZyc9m4EkH7FLfBGilANhCrH.jpg',
      selected: false,
      created_on: new Date(),
      updated_on: new Date()
    } 
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('banners', null, {});
  }
};
