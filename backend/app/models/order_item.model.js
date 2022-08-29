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
      allowNull: false
    },
    seller_id: {
      type: Sequelize.UUID,
      allowNull: false
    },
    item_id: {
      type: Sequelize.UUID,
      allowNull: false
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