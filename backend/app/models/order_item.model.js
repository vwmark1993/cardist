module.exports = (sequelize, Sequelize) => {
  const OrderItem = sequelize.define("order_item", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    order_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: {
          tableName: 'orders',
        },
        key: 'id'
      },
      onDelete: 'CASCADE'
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
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    price: {
      type: Sequelize.FLOAT,
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
  }, {
    timestamps: false
  });
  return OrderItem;
};