'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('items', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      seller_id: {
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
      images: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        defaultValue: []
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      number_sold: {
        type: Sequelize.INTEGER,
        defaultValue: 0
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
    await queryInterface.removeConstraint('comments', 'comments_item_id_fkey', {});
    await queryInterface.removeConstraint('item_tags', 'item_tags_item_id_fkey', {});
    await queryInterface.removeConstraint('cart_items', 'cart_items_item_id_fkey', {});

    await queryInterface.dropTable('items');
  }
};
