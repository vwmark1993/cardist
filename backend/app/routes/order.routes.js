module.exports = app => {
    const orders = require("../controllers/order.controller.js");
    var router = require("express").Router();
    // Create a new Order
    router.post("/create/buyerId/:buyerId/sellerId/:sellerId/itemId/:itemId/quantity/:quantity/price/:price", orders.create);
    // Retrieve all Orders
    router.get("/find", orders.findAll);
    // Retrieve Orders by Seller ID
    router.get("/find/sellerId/:sellerId", orders.findOrdersBySeller);
    // Retrieve Orders by Buyer ID
    router.get("/find/buyerId/:buyerId", orders.findOrdersByBuyer);
    // Retrieve a single Order with id
    router.get("/find/:id", orders.findOne);
    // Delete an Order with id
    router.delete("/:id", orders.delete);
  };