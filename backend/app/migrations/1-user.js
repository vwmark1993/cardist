'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      phone: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      picture: {
        type: Sequelize.TEXT
      },
      settings: {
        type: Sequelize.JSON,
        defaultValue: {}
      },
      total_earnings: {
        type: Sequelize.FLOAT,
        defaultValue: 0.00
      },
      total_spending: {
        type: Sequelize.FLOAT,
        defaultValue: 0.00
      },
      admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      created_on: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_on: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('orders', 'orders_buyer_id_fkey', {});
    await queryInterface.removeConstraint('comments', 'comments_user_id_fkey', {});
    await queryInterface.removeConstraint('items', 'items_seller_id_fkey', {});
    await queryInterface.removeConstraint('carts', 'carts_user_id_fkey', {});
    
    await queryInterface.dropTable('users');
  }
};
