module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
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
    item_id: {
      type: Sequelize.UUID,
      allowNull: false
    },
    message: {
      type: Sequelize.STRING
    },
    flagged: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    flagged_reason: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    flagged_reason_message: {
      type: Sequelize.STRING,
      defaultValue: null
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
  return Comment;
};