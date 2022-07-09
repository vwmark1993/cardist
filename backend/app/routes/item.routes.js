module.exports = app => {
    const items = require("../controllers/item.controller.js");
    var router = require("express").Router();
    // Create a new Item
    router.post("/", items.create);
    // Retrieve all Items
    router.get("/", items.findAll);
    // Retrieve all published Tutorials
    router.get("/published", items.findAllPublished);
    // Retrieve a single Item with id
    router.get("/:id", items.findOne);
    // Update a Tutorial with id
    router.put("/:id", items.update);
    // Delete a Tutorial with id
    router.delete("/:id", items.delete);
    // Create a new Tutorial
    router.delete("/", items.deleteAll);
    app.use('/api/items', router);
  };