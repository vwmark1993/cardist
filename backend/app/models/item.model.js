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
    creation_date: {
      type: Sequelize.DATE
    },
    number_sold: {
      type: Sequelize.INTEGER
    }
  });
  return Item;
};