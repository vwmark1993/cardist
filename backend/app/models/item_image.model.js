module.exports = (sequelize, Sequelize) => {
  const Item_Image = sequelize.define("item_image", {
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
    image: {
      type: Sequelize.TEXT,
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
  return Item_Image;
};