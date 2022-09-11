module.exports = app => {
    const itemTags = require("../controllers/itemTag.controller.js");
    var router = require("express").Router();
    // Create a new Item Tag with a User ID
    router.post("/create", itemTags.create);
    // Retrieve Tags by Item ID
    router.get("/find/itemId/:itemId", itemTags.findTagsByItem);
    // Retrieve Items by Tag ID
    router.get("/find/tagId/:tagId", itemTags.findItemsByTag);
    // Delete an ItemTag with id
    router.delete("/delete/:id", itemTags.delete);
    app.use('/api/itemTag', router);
  };