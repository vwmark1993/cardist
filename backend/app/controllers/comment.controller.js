const db = require("../models");
const Comment = db.comments;
const Op = db.Sequelize.Op;
// Create and Save a new Tutorial
exports.create = (req, res) => {
  const comment = {
    user_id: req.body.userId,
    item_id: req.body.itemId,
    message: req.body.message
  };
  Comment.create(comment)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Comment."
      });
    });
};
// Retrieve all Comments tied to an Item from the database.
exports.findByItemId = (req, res) => {
    const itemId = req.params.itemId;
    var condition = itemId ? { item_id: `${itemId}` } : null;
    Comment.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving comments."
        });
      });
  };
// Retrieve all Comments tied to a User from the database.
exports.findByUserId = (req, res) => {
  const userId = req.params.userId;
  var condition = userId ? { user_id: `${userId}` } : null;
  Comment.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving comments."
      });
    });
};
// Find a single Comment with an id
exports.findOne = (req, res) => {
  const commentId = req.params.commentId;
  Comment.findByPk(commentId)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Item with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Item with id=" + id
      });
    });
};

// Find all flagged comments
exports.findFlaggedComments = (req, res) => {
  Comment.findAll({ where: { flagged: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving flagged comments."
      });
    });
};

// Update a Comment by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Comment.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Comment Updated"
        });
      } else {
        res.send({
          message: `Could not update Comment with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Comment with id=" + id
      });
    });
};
// Delete a Comment with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Comment.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Comment was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Comment with id=${id}. Comment was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Comment with id=" + id
      });
    });
};
