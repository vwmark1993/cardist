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
    // Delete a User with id
    router.delete("/:id", users.delete);
    // Authenticate user login
    router.post("/authenticate/username/:username/password/:password", users.authenticate);
    app.use('/api/user', router);
  };