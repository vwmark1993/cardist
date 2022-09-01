module.exports = app => {
    const orders = require("../controllers/order.controller.js");
    var router = require("express").Router();
    // Create a new Order
    router.post("/create", orders.create);
    // Retrieve all Orders
    router.get("/find", orders.findAll);
    // Retrieve Orders by Buyer ID
    router.get("/find/buyerId/:buyerId", orders.findOrdersByBuyer);
    // Retrieve a single Order with id
    router.get("/find/:id", orders.findOne);
    // Delete an Order with id
    router.delete("/delete/:id", orders.delete);
    // Stripe routing
    router.get("/success/sessionId/:sessionId", orders.successfulOrder);
    app.use('/api/order', router);
  };