module.exports = app => {
    const orderItems = require("../controllers/orderItem.controller.js");
    var router = require("express").Router();
    // Create a new Order Item with a User ID
    router.post("/create", orderItems.create);
    // Retrieve Order Items by Order ID
    router.get("/find/orderId/:orderId", orderItems.findOrderItems);
    // Retrieve Order Items by Seller ID
    router.get("/find/sellerId/:sellerId", orderItems.findOrderItemsBySeller);
    // Retrieve the monthly unit sales of specified year
    router.get("/find/monthlySales/:year", orderItems.findMonthlySales);
    // Retrieve the top sellers with the highest quantity sold
    router.get("/find/topSellers/:size", orderItems.findTopSellers);
    // Delete an Order Item with id
    router.delete("/delete/:id", orderItems.delete);
    app.use('/api/orderItem', router);
  };