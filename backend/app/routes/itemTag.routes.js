module.exports = app => {
    const itemTags = require("../controllers/itemTag.controller.js");
    var router = require("express").Router();
    // Create a new Cart Item with a User ID
    router.post("/create/itemId/:itemId/cartId/:cartId", itemTags.create);
    // Retrieve Cart Items by Cart ID
    router.get("/find/cartId/:cartId", itemTags.findCartItems);
    // Retrieve all published Tutorials
    router.put("/update/:quantity/:id", itemTags.update);
    // Retrieve a single Cart Item with id
    router.get("/find/cartItemId/:id", itemTags.findOne);
    // Update a Tutorial with id
    router.put("/:id", itemTags.update);
    // Delete a CartItem with id
    router.delete("/delete/:id", itemTags.delete);
    app.use('/api/cartItem', router);
  };