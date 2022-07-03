module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    settings: {
      type: Sequelize.JSON
    },
    total_earnings: {
      type: Sequelize.FLOAT,
      defaultValue: 0.00
    },
    total_spending: {
      type: Sequelize.FLOAT,
      defaultValue: 0.00
    },
    admin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
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
  return User;
};