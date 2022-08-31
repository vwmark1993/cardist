module.exports = app => {
    const tags = require("../controllers/tag.controller.js");
    var router = require("express").Router();
    // Create a new Cart Item with a User ID
    router.post("/create", tags.create);
    // Retrieve Cart by User ID
    router.get("/find", tags.findAll);
    // Retrieve a single Comment with id
    router.get("/find/tagId/:id", tags.findOne);
    // Delete a Cart with id
    router.delete("/delete", tags.delete);
    app.use('/api/tag', router);
  };