module.exports = app => {
    const comments = require("../controllers/comment.controller.js");
    var router = require("express").Router();
    // Create a new Comment
    router.post("/", comments.create);
    // Retrieve Comments by item ID
    router.get("/find/itemId/:itemId", comments.findByItemId);
    // Retrieve Comments by user ID
    router.get("/find/userId/:userId", comments.findByUserId);
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
    app.use('/api/comment', router);
  };