module.exports = (sequelize, Sequelize) => {
  const Item = sequelize.define("order", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    buyer_id: {
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
      type: Sequelize.INT,
      allowNull: false,
      defaultValue: 0
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0.00
    },
    created_on: {
      type: Sequelize.DATE
    },
    updated_on: {
      type: Sequelize.DATE
    }
  }, {
    timestamps: false
  });
  return Order;
};