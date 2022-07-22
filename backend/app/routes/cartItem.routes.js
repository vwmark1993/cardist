module.exports = app => {
    const cartItems = require("../controllers/cartItem.controller.js");
    var router = require("express").Router();
    // Create a new Cart Item with a User ID
    router.post("/create/itemId/:itemId/cartId/:cartId", cartItems.create);
    // Retrieve Cart Items by Cart ID
    router.get("/find/cartId/:cartId", cartItems.findCartItems);
    // Retrieve all published Tutorials
    router.get("/published", cartItems.findAllPublished);
    // Retrieve a single Comment with id
    router.get("/:id", cartItems.findOne);
    // Update a Tutorial with id
    router.put("/:id", cartItems.update);
    // Delete a CartItem with id
    router.delete("/delete/:id", cartItems.delete);
    // Create a new Tutorial
    router.delete("/", cartItems.deleteAll);
    app.use('/api/cartItem', router);
  };