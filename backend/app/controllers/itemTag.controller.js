const db = require("../models");
const ItemTag = db.item_tags;
const Op = db.Sequelize.Op;

// Create and Save a new Item Tag
exports.create = (req, res) => {
  if (!req.body.itemId || !req.body.tagId) {
    res.status(400).send({
      message: "Content cannot be empty."
    });
    return;
  }

  ItemTag.findAll({ where: { item_id: `${req.body.itemId}`, tag_id: `${req.body.tagId}` } })
    .then(data => {
      if (data.length > 0) {
        // Item already has the tag
        res.status(201).send({
          message: "Item already has the specified tag."
        });
      } else {
        // Item doesn't have the tag
        const itemTag = {
          item_id: req.body.itemId,
          tag_id: req.body.tagId
        };
        ItemTag.create(itemTag)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Item Tag."
            });
          });
      }
    })
};
// Retrieve Item Tags tied to a User from the database.
exports.findItemTags = (req, res) => {
  console.log('test')
  const itemId = req.params.itemId;
  console.log(itemId)
  var condition = itemId ? { item_id: `${itemId}` } : null;
  ItemTag.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving item tags."
      });
    });
  };
// Delete a Item Tag with the specified id
exports.delete = (req, res) => {
  const id = req.body.id;
  ItemTag.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Item Tag was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Item Tag with id=${id}. Item Tag was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Item Tag with id=" + id
      });
    });
};
