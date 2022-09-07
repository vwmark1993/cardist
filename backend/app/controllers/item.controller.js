const db = require("../models");
const Item = db.items;
const Op = db.Sequelize.Op;
// Create and Save a new Tutorial
exports.create = (req, res) => {
  
};
// Retrieve all Items from the database.
exports.findAll = (req, res) => {
  Item.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while searching items."
      });
    });
  };

// Retrieve Items by search string. 
exports.findBySearch = (req, res) => {
  const searchString = req.params.searchString;
  console.log('searchString:' + searchString)
  var condition = searchString ? { name: { [Op.iLike]: `%${searchString}%` } } : null;
  Item.findAll({ where: condition })
    .then(data => {
      console.log(data)
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while searching items."
      });
    });
  };
// Find a single Item with an id
exports.findByItemId = (req, res) => {
  const id = req.params.itemId;
  Item.findByPk(id)
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

// Find Items by Seller ID
exports.findBySellerId = (req, res) => {
  const sellerId = req.params.sellerId;
  var condition = sellerId ? { seller_id: sellerId } : null;
  Item.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving items."
      });
    });
};

// Update an Item by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Item.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Item was updated successfully."
        });
      } else {
        res.send({
          message: `Could not update Item with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Item with id=" + id
      });
    });
};
// Delete a Item with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Item.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Item was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Item with id=${id}. Item was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Item with id=" + id
      });
    });
};