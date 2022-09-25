module.exports = app => {
    const carts = require("../controllers/cart.controller.js");
    var router = require("express").Router();
    // Create a new Cart Item with a User ID
    router.post("/create", carts.create);
    // Retrieve Cart by User ID
    router.get("/find/userId/:userId", carts.findUserCart);
    // Stripe routing
    router.post("/create-checkout-session", carts.createCheckoutSession);
    app.use('/api/cart', router);
  };