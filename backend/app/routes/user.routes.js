module.exports = app => {
    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();
    // Authenticate user login
    router.post("/authenticate", users.authenticate);
    // Check password
    router.put("/changePassword/:id", users.changePassword);
    // Create a new User
    router.post("/create", users.create);
    // Retrieve all Users
    router.get("/find", users.findAll);
    // Retrieve a single User with id
    router.get("/find/userId/:id", users.findOne);
    // Update a User with id
    router.put("/update/:id", users.update);
    // Delete a User with id
    router.delete("/:id", users.delete);
    app.use('/api/user', router);
  };