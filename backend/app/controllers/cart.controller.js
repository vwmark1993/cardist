const db = require("../models");
const Cart = db.carts;
const Item = db.items;
const Op = db.Sequelize.Op;
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

// Create and Save a new Tutorial
exports.create = (req, res) => {
  const cart = {
    user_id: req.params.userId
  };
  Cart.create(cart)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Cart."
      });
    });
};
// Retrieve Cart tied to a User from the database.
exports.findUserCart = (req, res) => {
    const userId = req.params.userId;
    var condition = userId ? { user_id: `${userId}` } : null;
    Cart.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving user cart."
        });
      });
  };
// Find a single Cart Item with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Cart.findByPk(id)
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
// Stripe checkout
exports.createCheckoutSession = async (req, res) => {
  // console.log(req.body.items)

  try {
    const items = await Item.findAll();
    
    let storeItems = []

    items.forEach(item => {
      storeItems.push({
        id: item.id,
        name: item.name,
        priceInCents: item.price * 100
      });
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: req.body.items.map(orderItem => {
        const storeItem = storeItems.find(storeItem => storeItem.id === orderItem.id)
        return {
          price_data: {
            currency: 'cad',
            product_data: {
              name: storeItem.name
            },
            unit_amount: storeItem.priceInCents
          },
          quantity: orderItem.quantity
        }
      }),
      success_url: `${process.env.CLIENT_URL}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${process.env.CLIENT_URL}/cart`
    })
    
    res.send({ url: session.url })
  } catch (e) {
    console.log(e)
    res.status(500).send({ error: e.message })
  }
};