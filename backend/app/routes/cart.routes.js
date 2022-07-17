module.exports = app => {
    const carts = require("../controllers/cart.controller.js");
    var router = require("express").Router();
    // Create a new Cart Item with a User ID
    router.post("/create/userId", carts.create);
    // Retrieve Cart by User ID
    router.get("/find/userId/:userId", carts.findUserCart);
    // Retrieve all published Tutorials
    router.get("/published", carts.findAllPublished);
    // Retrieve a single Comment with id
    router.get("/:id", carts.findOne);
    // Update a Tutorial with id
    router.put("/:id", carts.update);
    // Delete a Tutorial with id
    router.delete("/:id", carts.delete);
    // Create a new Tutorial
    router.delete("/", carts.deleteAll);
    app.use('/api/cart', router);
  };