const crypto = require('crypto');
const { sequelize } = require("../models");
const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Login authentication.
exports.authenticate = (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    if (username == null || username.length == 0) {
      res.status(201).send({
        message: "Invalid Username"
      });
      return
    } else if (password == null || password.length == 0) {
      res.status(202).send({
        message: "Invalid Password"
      });
      return
    }

    // Check the username.
    let condition = username ? { username: `${username}` } : null;
    User.findAll({ where: condition })
    .then(userRes => {
      if (userRes.length == 0) {
        res.status(201).send({
          message: "Invalid Username"
        });
        return
      }

      // Check the password.
      let hashedPassword = crypto.createHash('md5').update(password).digest('hex');

      if (hashedPassword !== userRes[0].password) {
        res.status(202).send({
          message: "Invalid Password"
        });
        return
      }

      res.status(200).send({
        message: "Authenticated.",
        user: {
          id: userRes[0].id,
          username: userRes[0].username,
          email: userRes[0].email,
          phone: userRes[0].phone,
          picture: userRes[0].picture,
          settings: userRes[0].settings,
          totalEarnings: userRes[0].total_earnings,
          totalSpending: userRes[0].total_spending,
          admin: userRes[0].admin
        }
      });
    })
  } catch (e) {
    res.status(500).send({
      message:
        e.message || "Failed to authenticate."
    });
  }
};

// Change a user's password.
exports.changePassword = (req, res) => {
  try {
    const id = req.params.id;
    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;

    if (newPassword == null || newPassword.length == 0) {
      res.status(201).send({
        message: "Invalid Password"
      });
      return
    }

    let condition = id ? { id: `${id}` } : null;
    User.findAll({ where: condition })
    .then(userRes => {
      if (userRes.length == 0) {
        res.status(201).send({
          message: "User Not Found"
        });
        return
      }

      let hashedPassword = crypto.createHash('md5').update(currentPassword).digest('hex');

      if (hashedPassword !== userRes[0].password) {
        res.status(202).send({
          message: "Invalid Password"
        });
        return
      }

      User.update({
        password: crypto.createHash('md5').update(newPassword).digest('hex')
      }, {
        where: { id: id }
      })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Password Changed"
          });
        } else {
          res.send({
            message: `Failed to change password`
          });
        }
      })
    })
  } catch (e) {
    res.status(500).send({
      message:
        e.message || "Error occurred while attempting to change the password."
    });
  }
};

// Create and save a new User.
exports.create = (req, res) => {
  try {
    // Check if the username already exists.
    User.findAll({ where: { username: `${req.body.username}` } })
    .then(data => {
      if (data.length > 0) {
        // Username exists.
        res.status(201).send({
          message: "Username already exists."
        });
      } else {
        // User data is valid.
        let password = req.body.password;
        let hashedPassword = crypto.createHash('md5').update(password).digest('hex');

        const user = {
          username: req.body.username,
          password: hashedPassword,
          email: req.body.email,
          phone: req.body.phone
        };
        User.create(user)
        .then(data => {
          res.send(data);
        })
      }
    })
  } catch (e) {
    res.status(500).send({
      message:
        e.message || "Some error occurred while creating the User."
    });
  }  
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  try {
    User.findAll()
    .then(data => {
      res.send(data);
    })
  } catch (e) {
    res.status(500).send({
      message:
        e.message || "Some error occurred while retrieving users."
    });
  }
};

// Find a single User with an id
exports.findOne = (req, res) => {
  try {
    const userId = req.params.id;
    User.findByPk(userId)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`
        });
      }
    })
  } catch (e) {
    res.status(500).send({
      message: "Error retrieving User with id=" + id
    });
  }
};

// Retrieve newly created user accounts.
exports.findNewUsersByYear = async (req, res) => {
  try {
    const year = req.params.year;
  
    const data = await sequelize.query(
      `
        SELECT
        COUNT(*) AS number_of_created_users
        FROM users
        WHERE EXTRACT(YEAR FROM created_on) = ?
      `, 
      {
        replacements: [year],
        type: sequelize.QueryTypes.SELECT
      }
    )

    res.send(data[0]);
  } catch (e) {
    console.log(e)
    res.status(500).send({
      message:
        e.message || "Some error occurred while retrieving newly registered users."
    });
  }
};

// Update a User
exports.update = (req, res) => {
  try {
    const id = req.params.id;
    User.update(req.body, {
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Updated User"
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
  } catch (e) {
    res.status(500).send({
      message: "Error updating User with id=" + id
    });
  }
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  try {
    const id = req.params.id;
  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `User delete Comment with id=${id}. User was not found!`
        });
      }
    })
  } catch (e) {
    res.status(500).send({
      message: "Could not delete Comment with id=" + id
    });
  }
};