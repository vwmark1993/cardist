module.exports = (sequelize, Sequelize) => {
  const Item = sequelize.define("item_category", {
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
    category_id: {
      type: Sequelize.UUID,
      allowNull: false
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
  return Item_Category;
};