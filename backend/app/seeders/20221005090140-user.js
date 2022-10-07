'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      id: 'af0e57a4-076f-4191-b7cd-5d48ba722372',
      username: 'admin',
      password: '2ac9cb7dc02b3c0083eb70898e549b63',
      email: '',
      phone: '',
      picture: '',
      settings: {},
      created_on: new Date(),
      updated_on: new Date()
    },
    {
      id: 'e7e8af3f-98f9-44a4-8bf6-b472600f4195',
      username: 'user1',
      password: '2ac9cb7dc02b3c0083eb70898e549b63',
      email: '',
      phone: '',
      picture: '',
      settings: {},
      created_on: new Date(),
      updated_on: new Date()
    },
    {
      id: '54c8fbe1-4421-4465-b1c3-179aed082d69',
      username: 'user2',
      password: '2ac9cb7dc02b3c0083eb70898e549b63',
      email: '',
      phone: '',
      picture: '',
      settings: {},
      created_on: new Date(),
      updated_on: new Date()
    },
    {
      id: 'c5180103-834c-465f-bd2c-528fe5e6193e',
      username: 'seller1',
      password: '2ac9cb7dc02b3c0083eb70898e549b63',
      email: '',
      phone: '',
      picture: '',
      settings: {},
      created_on: new Date(),
      updated_on: new Date()
    },
    {
      id: 'ecd6a4a3-a84c-4a13-9eba-36811a116e41',
      username: 'seller2',
      password: '2ac9cb7dc02b3c0083eb70898e549b63',
      email: '',
      phone: '',
      picture: '',
      settings: {},
      created_on: new Date(),
      updated_on: new Date()
    },
    {
      id: '257cfb4c-0aa4-404e-b878-551964fc5046',
      username: 'seller3',
      password: '2ac9cb7dc02b3c0083eb70898e549b63',
      email: '',
      phone: '',
      picture: '',
      settings: {},
      created_on: new Date(),
      updated_on: new Date()
    },
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
