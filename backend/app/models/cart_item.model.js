module.exports = (sequelize, Sequelize) => {
  const Cart_Item = sequelize.define("cart_item", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
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
    cart_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: {
          tableName: 'carts',
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
  return Cart_Item;
};