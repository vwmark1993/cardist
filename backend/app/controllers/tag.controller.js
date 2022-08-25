const db = require("../models");
const Tag = db.tags;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  
};
// Retrieve Cart tied to a User from the database.
exports.findAll = (req, res) => {
  Tag.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Tags."
      });
    });
  };
// Find a single Cart Item with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Tag.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tag with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Item with id=" + id
      });
    });
};
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  
};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};