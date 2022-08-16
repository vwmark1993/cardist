const db = require("../models");
const Order = db.orders;
const Op = db.Sequelize.Op;
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

// Create and Save a new Order
exports.create = (req, res) => {
  const order = {
    buyer_id: req.params.buyerId,
    seller_id: req.params.sellerId,
    item_id: req.params.itemId,
    quantity: req.params.itemId
  };
  Order.create(order)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Order."
      });
    });
};

// Retrieve all Orders from the database.
exports.findAll = (req, res) => {
  // need to replace this for search functionality
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  Order.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving orders."
      });
    });
};

// Retrieve Orders tied to a Buyer from the database.
exports.findOrdersBySeller = (req, res) => {
  const sellerId = req.params.sellerId;
  var condition = sellerId ? { seller_id: `${sellerId}` } : null;
  Order.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving orders."
      });
    });
};

// Retrieve Orders tied to a Buyer from the database.
exports.findOrdersByBuyer = (req, res) => {
    const buyerId = req.params.buyerId;
    var condition = buyerId ? { buyer_id: `${buyerId}` } : null;
    Order.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving orders."
        });
      });
  };
// Find a single Order with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Order.findByPk(id)
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

// Delete a Cart Item with the specified id
exports.delete = (req, res) => {
  const id = req.params.id;
  Order.destroy({
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

exports.successfulOrder = async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
  // const customer = await stripe.customers.retrieve(session.customer);

  let orderDetails = {
    customerName: session.customer_details.name,
    currency: session.currency,
    total: session.amount_total
  }

  res.send(orderDetails);
};
