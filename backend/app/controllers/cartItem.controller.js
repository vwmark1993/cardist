const db = require("../models");
const CartItem = db.cart_items;
const Op = db.Sequelize.Op;

// Create and Save a new Cart Item
exports.create = (req, res) => {
  if (!req.params.itemId || !req.params.cartId || !req.params.price) {
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
          quantity: 1,
          price: req.params.price
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