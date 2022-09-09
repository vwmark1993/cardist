const db = require("../models");
const CartItem = db.cart_items;
const Op = db.Sequelize.Op;

// Create and Save a new Cart Item
exports.create = (req, res) => {
  try {
    if (!req.body.itemId || !req.body.cartId) {
      res.status(400).send({
        message: "Content cannot be empty."
      });
      return;
    }
  
    // Check if the item already exists in the cart
    const itemId = req.body.itemId;
    const cartId = req.body.cartId;

    let condition = itemId ? cartId ? { item_id: `${itemId}`, cart_id: `${cartId}` } : null : null;

    CartItem.findAll({ where: condition })
    .then(data => {
      if (data.length > 0) {
        // Item exists
        res.status(201).send({
          message: "Item already exists in cart."
        });
      } else {
        // Item doesn't exist
        const cartItem = {
          item_id: itemId,
          cart_id: cartId,
          quantity: 1
        };
        CartItem.create(cartItem)
        .then(data => {
          res.send(data);
        })
      }
    })
  } catch (e) {
    res.status(500).send({
      message:
        e.message || "Some error occurred while creating the Cart Item."
    });
  }
  
};
// Retrieve Cart Items tied to a User from the database.
exports.findCartItems = (req, res) => {
  try {
    const cartId = req.params.cartId;
    let condition = cartId ? { cart_id: `${cartId}` } : null;
    CartItem.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
  } catch (e) {
    res.status(500).send({
      message:
        e.message || "Some error occurred while retrieving cart items."
    });
  }
};
// Find a single Cart Item with an id
exports.findOne = (req, res) => {
  try {
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
  } catch (e) {
    res.status(500).send({
      message: "Error retrieving Item with id=" + id
    });
  }
};
// Update a Cart Item by the id in the request
exports.update = (req, res) => {
  try {
    const id = req.params.id;

    CartItem.update(req.body, {
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cart Item was updated successfully."
        });
      } else {
        res.send({
          message: `Could not update Cart Item with id=${id}.`
        });
      }
    })
  } catch (e) {
    res.status(500).send({
      message: "Error updating Cart Item with id=" + id
    });
  }
};
// Delete a Cart Item with the specified id
exports.delete = (req, res) => {
  try {
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
  } catch (e) {
    res.status(500).send({
      message: "Could not delete Cart Item with id=" + id
    });
  }
};