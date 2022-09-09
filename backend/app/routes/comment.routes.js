module.exports = app => {
    const comments = require("../controllers/comment.controller.js");
    var router = require("express").Router();
    // Create a new Comment
    router.post("/create", comments.create);
    // Retrieve Comments by item ID
    router.get("/find/itemId/:itemId", comments.findByItemId);
    // Retrieve Comments by user ID
    router.get("/find/userId/:userId", comments.findByUserId);
    // Retrieve a single Comment with id
    router.get("/find/commentId/:commentId", comments.findOne);
    // Retrieve all flagged comments
    router.get("/find/flaggedComments", comments.findFlaggedComments);
    // Update a Comment with id
    router.put("/update/:id", comments.update);
    // Delete a Comment with id
    router.delete("/delete/:id", comments.delete);
    app.use('/api/comment', router);
  };