module.exports = app => {
    const items = require("../controllers/item.controller.js");
    var router = require("express").Router();
    // Create a new Item
    router.post("/", items.create);
    // Retrieve all Items
    router.get("/find", items.findAll);
    // Retrieve a single Item by Item ID
    router.get("/find/itemId/:itemId", items.findOne);
    // Retrieve Items by Seller ID
    router.get("/find/sellerId/:selleriD", items.findBySellerId);
    // Update a Tutorial with id
    router.put("/:id", items.update);
    // Delete a Tutorial with id
    router.delete("/:id", items.delete);
    // Create a new Tutorial
    router.delete("/", items.deleteAll);
    app.use('/api/item', router);
  };