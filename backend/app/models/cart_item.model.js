module.exports = (sequelize, Sequelize) => {
  const Item = sequelize.define("cart_item", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    item_id: {
      type: Sequelize.UUID,
      allowNull: false
    },
    cart_id: {
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
  return Cart_Item;
};