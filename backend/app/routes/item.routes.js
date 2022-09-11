module.exports = app => {
    const items = require("../controllers/item.controller.js");
    var router = require("express").Router();
    // Create a new Item
    router.post("/create", items.create);
    // Retrieve all Items
    router.get("/find", items.findAll);
    // Retrieve items by search string
    router.get("/find/searchString/:searchString", items.findBySearch);
    // Retrieve a single Item by Item ID
    router.get("/find/itemId/:itemId", items.findByItemId);
    // Retrieve Items by Seller ID
    router.get("/find/sellerId/:sellerId", items.findBySellerId);
    // Retrieve the most popular items with the highest numbers sold
    router.get("/find/popularItemsByYear/:year", items.findPopularItemsByYear);
    // Update an Item with given id
    router.put("/update/:id", items.update);
    // Delete an Item with given id
    router.delete("/delete/:id", items.delete);
    app.use('/api/item', router);
  };