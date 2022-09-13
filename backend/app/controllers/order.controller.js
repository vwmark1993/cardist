const db = require("../models");
const Order = db.orders;
const Op = db.Sequelize.Op;
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

// Create and Save a new Order
exports.create = (req, res) => {
  try {
    const order = {
      buyer_id: req.body.buyerId
    };
    Order.create(order)
    .then(data => {
      res.send(data);
    })
  } catch (e) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Order."
    });
  }
};

// Retrieve all Orders from the database.
exports.findAll = (req, res) => {
  try {
    // need to replace this for search functionality
    const name = req.query.name;
    let condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
    Order.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
  } catch (e) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving orders."
    });
  }
};

// Retrieve Orders tied to a Buyer from the database.
exports.findOrdersByBuyer = (req, res) => {
  try {
    const buyerId = req.params.buyerId;
    let condition = buyerId ? { buyer_id: `${buyerId}` } : null;
    Order.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
  } catch (e)  {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving orders."
    });
  }
};
// Find a single Order with an id
exports.findOne = (req, res) => {
  try {
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
  } catch (e) {
    res.status(500).send({
      message: "Error retrieving Item with id=" + id
    });
  }
};

// Delete a Order with the specified id
exports.delete = (req, res) => {
  try {
    const id = req.params.id;
    Order.destroy({
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Order was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Order with id=${id}. Order was not found!`
        });
      }
    })
  } catch (e) {
    res.status(500).send({
      message: "Could not delete Order with id=" + id
    });
  }
};

exports.successfulOrder = async (req, res) => {
  try {
    if (req.params.sessionId === 'undefined' || !req.params.sessionId) {
      return
    }
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
    // const customer = await stripe.customers.retrieve(session.customer);

    let orderDetails = {
      customerName: session.customer_details.name,
      currency: session.currency,
      total: session.amount_total
    }

    res.send(orderDetails);

  } catch (e) {
    console.log(e)
    res.status(500).send({ error: e.message })
  }
};
