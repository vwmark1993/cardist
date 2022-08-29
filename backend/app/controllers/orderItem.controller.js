const db = require("../models");
const OrderItem = db.order_items;
const Op = db.Sequelize.Op;

// Create and Save a new Order Item
exports.create = (req, res) => {
  if (!req.params.orderId || !req.params.itemId || !req.params.sellerId || !req.params.quantity || !req.params.price) {
    res.status(400).send({
      message: "Content cannot be empty."
    });
    return;
  }

  // Item doesn't exist
  const orderItem = {
    order_id: req.params.orderId,
    item_id: req.params.itemId,
    seller_id: req.params.sellerId,
    quantity: req.params.quantity,
    price: req.params.price
  };

  OrderItem.create(orderItem)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Order Item."
      });
    });
};
// Retrieve Order Items tied to a User from the database.
exports.findOrderItems = (req, res) => {
    const orderId = req.params.orderId;
    var condition = orderId ? { order_id: `${orderId}` } : null;
    OrderItem.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving order items."
        });
      });
  };
// Find a single Order Item with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  OrderItem.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Order Item with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Order Item with id=" + id
      });
    });
};

// Retrieve Orders tied to a Buyer from the database.
exports.findOrderItemsBySeller = (req, res) => {
  const sellerId = req.params.sellerId;
  var condition = sellerId ? { seller_id: `${sellerId}` } : null;
  OrderItem.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving order items."
      });
    });
};

// Delete a Cart Item with the specified id
exports.delete = (req, res) => {
  const id = req.params.id;
  OrderItem.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Order Item was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Order Item with id=${id}. Order Item was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Order Item with id=" + id
      });
    });
};
