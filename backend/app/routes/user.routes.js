module.exports = app => {
    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();
    // Create a new User
    router.post("/create/username/:username/password/:password/email/:email/phone/:phone", users.create);
    // Retrieve all Users
    router.get("/find", users.findAll);
    // Retrieve a single User with id
    router.get("/find/:id", users.findOne);
    // Update a User with id
    router.put("/:id", users.update);
    // Delete a Tutorial with id
    router.delete("/:id", users.delete);
    // Create a new Tutorial
    router.delete("/", users.deleteAll);
    app.use('/api/user', router);
  };