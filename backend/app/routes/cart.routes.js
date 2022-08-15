module.exports = app => {
    const carts = require("../controllers/cart.controller.js");
    var router = require("express").Router();
    // Create a new Cart Item with a User ID
    router.post("/create/userId/:userId", carts.create);
    // Retrieve Cart by User ID
    router.get("/find/userId/:userId", carts.findUserCart);
    // Retrieve a single Comment with id
    router.get("/:id", carts.findOne);
    // Update a Cart with id
    router.put("/:id", carts.update);
    // Delete a Cart with id
    router.delete("/:id", carts.delete);
    // Stripe routing
    router.post("/create-checkout-session", carts.createCheckoutSession);
    app.use('/api/cart', router);
  };