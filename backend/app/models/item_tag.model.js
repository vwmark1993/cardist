module.exports = (sequelize, Sequelize) => {
  const Item_Tag = sequelize.define("item_tag", {
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
    tag_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: {
          tableName: 'tags',
        },
        key: 'id'
      },
      onDelete: 'CASCADE'
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
  return Item_Tag;
};