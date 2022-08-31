const db = require("../models");
const Tag = db.tags;
const Op = db.Sequelize.Op;

// Create and Save a new Tag
exports.create = (req, res) => {
  
};
// Retrieve Tag tied to a User from the database.
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
// Find a single Tag Item with an id
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
        message: "Error retrieving Tag with id=" + id
      });
    });
};
// Update a Tag by the id in the request
exports.update = (req, res) => {
  
};
// Delete a Tag with the specified id in the request
exports.delete = (req, res) => {
  
};