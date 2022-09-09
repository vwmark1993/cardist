const db = require("../models");
const Cart = db.carts;
const Item = db.items;
const Op = db.Sequelize.Op;
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

// Create and Save a new Cart
exports.create = (req, res) => {
  try {
    const cart = {
      user_id: req.body.userId
    };
    Cart.create(cart)
      .then(data => {
        res.send(data);
      })
  } catch (e) {
    res.status(500).send({
      message:
        e.message || "Some error occurred while creating the Cart."
    });
  }
};
// Retrieve Cart tied to a User from the database.
exports.findUserCart = (req, res) => {
  try {
    const userId = req.params.userId;
    let condition = userId ? { user_id: `${userId}` } : null;
    Cart.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
  } catch (e) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving user cart."
    });
  }
};

// Update a Cart by the id in the request
exports.update = (req, res) => {
  
};
// Delete a Cart with the specified id in the request
exports.delete = (req, res) => {
  
};

// Stripe checkout
exports.createCheckoutSession = async (req, res) => {
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
    res.status(500).send({ error: e.message })
  }
};