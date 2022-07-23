const db = require("../models");
const CartItem = db.cart_items;
const Op = db.Sequelize.Op;

// Create and Save a new Cart Item
exports.create = (req, res) => {
  if (!req.params.itemId || !req.params.cartId) {
    res.status(400).send({
      message: "Content cannot be empty."
    });
    return;
  }

  // Check if the item already exists in the cart
  CartItem.findAll({ where: { item_id: `${req.params.itemId}` } })
    .then(data => {
      if (data.length > 0) {
        // Item exists
        res.status(201).send({
          message: "Item already exists in cart."
        });
      } else {
        // Item doesn't exist
        const cartItem = {
          item_id: req.params.itemId,
          cart_id: req.params.cartId,
          quantity: 1
        };
        CartItem.create(cartItem)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Cart Item."
            });
          });
      }
    })
};
// Retrieve Cart Items tied to a User from the database.
exports.findCartItems = (req, res) => {
    const cartId = req.params.cartId;
    var condition = cartId ? { cart_id: `${cartId}` } : null;
    CartItem.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving cart items."
        });
      });
  };
// Find a single Cart Item with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  CartItem.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Cart with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Item with id=" + id
      });
    });
};
// Update a Carrt Item by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  const quantity = req.params.quantity;

  console.log("id: " + id)
  console.log("quantity: " + quantity)
  CartItem.update({
    quantity: quantity
  }, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cart Item was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Cart Item with id=${id}. Maybe Cart Item was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Cart Item with id=" + id
      });
    });
};
// Delete a Cart Item with the specified id
exports.delete = (req, res) => {
  const id = req.params.id;
  CartItem.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cart Item was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Cart Item with id=${id}. Cart Item was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Cart Item with id=" + id
      });
    });
};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};
// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};