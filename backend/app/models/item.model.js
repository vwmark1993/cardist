module.exports = (sequelize, Sequelize) => {
  const Item = sequelize.define("item", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    seller_id: {
      type: Sequelize.UUID,
      allowNull: false
    },
    images: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false
    },
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.FLOAT
    },
    number_sold: {
      type: Sequelize.INTEGER
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
  return Item;
};