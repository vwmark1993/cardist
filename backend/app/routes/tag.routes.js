module.exports = app => {
    const tags = require("../controllers/tag.controller.js");
    var router = require("express").Router();
    // Create a new Tag
    router.post("/create", tags.create);
    // Retrieve all tags
    router.get("/find", tags.findAll);
    // Retrieve a single Tag with id
    router.get("/find/tagId/:id", tags.findOne);
    // Retrieve the most popular tags with the highest sales
    router.get("/find/popularTagsByYear/:year", tags.findPopularTagsByYear);
    // Delete a Tag with id
    router.delete("/delete/:id", tags.delete);
    app.use('/api/tag', router);
  };