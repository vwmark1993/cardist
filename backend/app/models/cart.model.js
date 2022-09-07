module.exports = (sequelize, Sequelize) => {
  const Cart = sequelize.define("cart", {
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
    total_price: {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0.00
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
  return Cart;
};