module.exports = app => {
    const carts = require("../controllers/cart.controller.js");
    var router = require("express").Router();
    // Create a new Cart Item with a User ID
    router.post("/create", carts.create);
    // Retrieve Cart by User ID
    router.get("/find/userId/:userId", carts.findUserCart);
    // Update a Cart with id
    router.put("/update/:id", carts.update);
    // Delete a Cart with id
    router.delete("/delete/:id", carts.delete);
    // Stripe routing
    router.post("/create-checkout-session", carts.createCheckoutSession);
    app.use('/api/cart', router);
  };