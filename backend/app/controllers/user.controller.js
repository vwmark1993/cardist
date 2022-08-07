const crypto = require('crypto');
const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Login authentication.
exports.authenticate = (req, res) => {
  const username = req.params.username;
  const password = req.params.password;

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

  let condition = username ? { username: `${username}` } : null;
  User.findAll({ where: condition })
    .then(usernameCheckRes => {
      if (usernameCheckRes.length == 0) {
        res.status(201).send({
          message: "Invalid username."
        });
        return
      }

      let hashedPassword = crypto.createHash('md5').update(password).digest('hex');
      let condition = hashedPassword ? { username: `${username}`, password: `${hashedPassword}` } : null;
      User.findAll({ where: condition })
      .then(passwordCheckRes => {
        if (passwordCheckRes.length == 0) {
          res.status(202).send({
            message: "Invalid password."
          });
          return
        }

        res.status(200).send({
          message: "Authenticated.",
          user: {
            id: passwordCheckRes[0].id,
            username: passwordCheckRes[0].username,
            email: passwordCheckRes[0].email,
            phone: passwordCheckRes[0].phone,
            picture: passwordCheckRes[0].picture,
            settings: passwordCheckRes[0].settings,
            totalEarnings: passwordCheckRes[0].total_earnings,
            totalSpending: passwordCheckRes[0].totalSpending,
            admin: passwordCheckRes[0].admin
          }
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Invalid password."
        });
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Invalid username."
      });
    });
};

// Create and save a new User.
exports.create = (req, res) => {

  // Check if the username already exists.
  User.findAll({ where: { username: `${req.params.username}` } })
    .then(data => {
      if (data.length > 0) {
        // Username exists.
        res.status(201).send({
          message: "Username already exists."
        });
      } else {
        // Username doesn't exist.
        let password = req.params.password;
        let hashedPassword = crypto.createHash('md5').update(password).digest('hex');

        const user = {
          username: req.params.username,
          password: hashedPassword,
          email: req.params.email,
          phone: req.params.phone
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
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  
};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};
// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};