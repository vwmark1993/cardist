module.exports = app => {
    const comments = require("../controllers/cart.controller.js");
    var router = require("express").Router();
    // Create a new Cart
    router.post("/", comments.create);
    // Retrieve Cart by User ID
    router.get("/userId/:userId", comments.findUserCart);
    // Retrieve all published Tutorials
    router.get("/published", comments.findAllPublished);
    // Retrieve a single Comment with id
    router.get("/:id", comments.findOne);
    // Update a Tutorial with id
    router.put("/:id", comments.update);
    // Delete a Tutorial with id
    router.delete("/:id", comments.delete);
    // Create a new Tutorial
    router.delete("/", comments.deleteAll);
    app.use('/api/cart', router);
  };