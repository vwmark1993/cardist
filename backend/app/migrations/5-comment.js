'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('comments', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      item_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: 'items',
          },
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      message: {
        type: Sequelize.STRING
      },
      flagged: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      flagged_reason: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      flagged_reason_message: {
        type: Sequelize.STRING,
        defaultValue: null
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
    await queryInterface.dropTable('comments');
  }
};
