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
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    phone: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    picture: {
      type: Sequelize.TEXT
    },
    settings: {
      type: Sequelize.JSON,
      defaultValue: {}
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
  return User;
};