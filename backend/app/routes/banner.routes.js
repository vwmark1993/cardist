module.exports = app => {
    const banners = require("../controllers/banner.controller.js");
    var router = require("express").Router();
    // Create a new Banner
    router.post("/create", banners.create);
    // Retrieve all banners
    router.get("/find", banners.findAll);
    // Retrieve a single Banner with id
    router.get("/find/tagId/:id", banners.findOne);
    // Retrieve the current selected Banner
    router.get("/find/selected", banners.findSelectedBanner);
    // Update a Cart with id
    router.put("/update/:id", banners.update);
    // Delete a Cart with id
    router.delete("/delete/:id", banners.delete);
    app.use('/api/banner', router);
  };