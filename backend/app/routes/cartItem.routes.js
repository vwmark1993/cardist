module.exports = app => {
    const cartItems = require("../controllers/cartItem.controller.js");
    var router = require("express").Router();
    // Create a new Cart Item with a User ID
    router.post("/create/itemId/:itemId/cartId/:cartId", cartItems.create);
    // Retrieve Cart Items by Cart ID
    router.get("/find/cartId/:cartId", cartItems.findCartItems);
    // Update Cart Item quantity
    router.put("/update/:quantity/:id", cartItems.update);
    // Retrieve a single Cart Item with id
    router.get("/find/cartItemId/:id", cartItems.findOne);
    // Delete a CartItem with id
    router.delete("/delete/:id", cartItems.delete);
    app.use('/api/cartItem', router);
  };