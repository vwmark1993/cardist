module.exports = app => {
    const items = require("../controllers/item.controller.js");
    var router = require("express").Router();
    // Create a new Item
    router.post("/", items.create);
    // Retrieve all Items
    router.get("/find", items.findAll);
    // Retrieve items by search string
    router.get("/find/searchString/:searchString", items.findBySearch);
    // Retrieve a single Item by Item ID
    router.get("/find/itemId/:itemId", items.findByItemId);
    // Retrieve Items by Seller ID
    router.get("/find/sellerId/:selleriD", items.findBySellerId);
    // Update an Item with given id
    router.put("/:id", items.update);
    // Delete an Item with given id
    router.delete("/:id", items.delete);
    app.use('/api/item', router);
  };