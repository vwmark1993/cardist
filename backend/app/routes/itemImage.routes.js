module.exports = app => {
    const itemImages = require("../controllers/itemImage.controller.js");
    var router = require("express").Router();
    // Create an Item Image
    router.post("/create", itemImages.create);
    // Retrieve Tags by Item ID
    router.get("/find/itemId/:itemId", itemImages.findItemImages);
    // Delete an ItemTag with id
    router.delete("/delete/:id", itemImages.delete);
    app.use('/api/itemImage', router);
  };