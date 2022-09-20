const db = require("../models");
const ItemImage = db.item_images;
const Op = db.Sequelize.Op;

// Create and Save a new Item Image
exports.create = (req, res) => {
  try {
    if (!req.body.itemId) {
      res.status(400).send({
        message: "Content cannot be empty."
      });
      return;
    }
  
    const itemImage = {
      item_id: req.body.itemId,
      image: req.body.image
    };
    
    ItemImage.create(itemImage)
    .then(data => {
      res.send(data);
    })
  } catch (e) {
    res.status(500).send({
      message:
        e.message || "Some error occurred while creating the Item Image."
    });
  }  
};

// Retrieve Item Images tied to an Item from the database.
exports.findItemImages = (req, res) => {
  try {
    const itemId = req.params.itemId;
    let condition = itemId ? { item_id: `${itemId}` } : null;
    ItemImage.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
  } catch (e) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving item image."
    });
  }
};

// Delete a Item Image with the specified id
exports.delete = (req, res) => {
  try {
    const id = req.params.id;
    ItemImage.destroy({
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Item Image was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Item Image with id=${id}. Item Tag was not found!`
        });
      }
    })
  } catch (e) {
    res.status(500).send({
      message: "Could not delete Item Image with id=" + id
    });
  }
};
