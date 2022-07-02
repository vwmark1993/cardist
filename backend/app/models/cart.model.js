module.exports = (sequelize, Sequelize) => {
  const Item = sequelize.define("cart", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: Sequelize.UUID,
      allowNull: false
    },
    total_price: {
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
  return Cart;
};