module.exports = app => {
    const comments = require("../controllers/comment.controller.js");
    var router = require("express").Router();
    // Create a new Comment
    router.post("/", comments.create);
    // Retrieve all Comments
    router.get("/item/:itemId", comments.findAllItemComments);
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
    app.use('/api/comments', router);
  };