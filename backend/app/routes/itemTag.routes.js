module.exports = app => {
    const itemTags = require("../controllers/itemTag.controller.js");
    var router = require("express").Router();
    // Create a new Item Tag with a User ID
    router.post("/create", itemTags.create);
    // Retrieve Cart Items by Cart ID
    router.get("/find/itemId/:itemId", itemTags.findItemTags);
    // Delete an ItemTag with id
    router.delete("/delete", itemTags.delete);
    app.use('/api/itemTag', router);
  };