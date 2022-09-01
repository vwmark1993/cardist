const crypto = require('crypto');
const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Login authentication.
exports.authenticate = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username == null || username.length == 0) {
    res.status(201).send({
      message: "Invalid username."
    });
    return
  } else if (password == null || password.length == 0) {
    res.status(202).send({
      message: "Invalid password."
    });
    return
  }

  // Check the username.
  let condition = username ? { username: `${username}` } : null;
  User.findAll({ where: condition })
    .then(userRes => {
      if (userRes.length == 0) {
        res.status(201).send({
          message: "Invalid username."
        });
        return
      }

      // Check the password.
      let hashedPassword = crypto.createHash('md5').update(password).digest('hex');

      if (hashedPassword !== userRes[0].password) {
        res.status(202).send({
          message: "Invalid password."
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
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Failed to authenticate."
      });
    });
};

// Change a user's password.
exports.changePassword = (req, res) => {
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
        .catch(err => {
          res.status(500).send({
            message: err.message || "Error occurred while attempting to change the password"
          }); 
        });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error occurred while querying the user"
      });
    });
};

// Create and save a new User.
exports.create = (req, res) => {

  // Check if the username already exists.
  User.findAll({ where: { username: `${req.body.username}` } })
    .then(data => {
      if (data.length > 0) {
        // Username exists.
        res.status(201).send({
          message: "Username already exists."
        });
      } else {
        // Username doesn't exist.
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
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the User."
            });
          });
      }
    })

  
};
// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    // need to replace this for search functionality
    const userId = req.params.id;
    let condition = userId ? { id: `${userId}` } : null;
    User.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
  };
// Find a single User with an id
exports.findOne = (req, res) => {
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
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};
// Update a User
exports.update = (req, res) => {
  const id = req.params.id;
  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};
// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  
};