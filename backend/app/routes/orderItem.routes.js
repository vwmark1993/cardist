module.exports = app => {
    const orderItems = require("../controllers/orderItem.controller.js");
    var router = require("express").Router();
    // Create a new Order Item with a User ID
    router.post("/create", orderItems.create);
    // Retrieve a single Order Item with id
    router.get("/find/orderItemId/:id", orderItems.findOne);
    // Retrieve Order Items by Order ID
    router.get("/find/orderId/:orderId", orderItems.findOrderItems);
    // Retrieve Order Items by Seller ID
    router.get("/find/sellerId/:sellerId", orderItems.findOrderItemsBySeller);
    // Retrieve the yearly unit sales of specified year
    router.get("/find/totalSalesRevenueByYear/:year", orderItems.findTotalSalesRevenueByYear);
    // Retrieve the yearly unit sales of specified year
    router.get("/find/unitsSoldByYear/:year", orderItems.findUnitsSoldByYear);
    // Retrieve the monthly unit sales of specified year
    router.get("/find/monthlySalesRevenueByYear/:year", orderItems.findMonthlySalesRevenueByYear);
    // Retrieve the top sellers with the highest quantity sold
    router.get("/find/topSellersByYear/:year", orderItems.findTopSellersByYear);
    // Retrieve the top buyers with the highest quantity sold
    router.get("/find/topBuyersByYear/:year", orderItems.findTopBuyersByYear);
    // Delete an Order Item with id
    router.delete("/delete/:id", orderItems.delete);
    app.use('/api/orderItem', router);
  };