const { sequelize } = require("../models");

const db = require("../models");
const OrderItem = db.order_items;
const Op = db.Sequelize.Op;

// Create and Save a new Order Item
exports.create = (req, res) => {
  try {
    if (!req.body.orderId || !req.body.itemId || !req.body.sellerId || !req.body.quantity || !req.body.price) {
      res.status(400).send({
        message: "Content cannot be empty."
      });
      return;
    }
  
    // Item doesn't exist
    const orderItem = {
      order_id: req.body.orderId,
      item_id: req.body.itemId,
      seller_id: req.body.sellerId,
      quantity: req.body.quantity,
      price: req.body.price
    };
  
    OrderItem.create(orderItem)
      .then(data => {
        res.send(data);
      })
  } catch (e) {
    res.status(500).send({
      message:
        e.message || "Some error occurred while creating the Order Item."
    });
  }
  
};
// Retrieve Order Items tied to a User from the database.
exports.findOrderItems = (req, res) => {
  try {
    const orderId = req.params.orderId;
    let condition = orderId ? { order_id: `${orderId}` } : null;
    OrderItem.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
  } catch (e) {
    res.status(500).send({
      message:
        e.message || "Some error occurred while retrieving order items."
    });
  }
};
// Find a single Order Item with an id
exports.findOne = (req, res) => {
  try {
    const id = req.params.id;
    OrderItem.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Order Item with id=${id}.`
        });
      }
    })
  } catch (e) {
    res.status(500).send({
      message: "Error retrieving Order Item with id=" + id
    });
  }
};

// Retrieve Order Items tied to a Buyer from the database.
exports.findOrderItemsBySeller = (req, res) => {
  try {
    const sellerId = req.params.sellerId;
    let condition = sellerId ? { seller_id: `${sellerId}` } : null;
    OrderItem.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
  } catch (e) {
    res.status(500).send({
      message:
        e.message || "Some error occurred while retrieving order items."
    });
  }
};

// Retrieve monthly sales numbers of specified year.
exports.findMonthlySalesRevenueByYear = async (req, res) => {
  try {
    const year = req.params.year;
  
    // Execute a custom prepared statement query.
    const data = await sequelize.query(
      `
        SELECT
        EXTRACT(MONTH FROM created_on) AS month_number
        , CASE
          WHEN EXTRACT(MONTH FROM created_on) = 1 THEN 'January' 
          WHEN EXTRACT(MONTH FROM created_on) = 2 THEN 'February' 
          WHEN EXTRACT(MONTH FROM created_on) = 3 THEN 'March' 
          WHEN EXTRACT(MONTH FROM created_on) = 4 THEN 'April' 
          WHEN EXTRACT(MONTH FROM created_on) = 5 THEN 'May' 
          WHEN EXTRACT(MONTH FROM created_on) = 6 THEN 'June' 
          WHEN EXTRACT(MONTH FROM created_on) = 7 THEN 'July' 
          WHEN EXTRACT(MONTH FROM created_on) = 8 THEN 'August' 
          WHEN EXTRACT(MONTH FROM created_on) = 9 THEN 'September' 
          WHEN EXTRACT(MONTH FROM created_on) = 10 THEN 'October' 
          WHEN EXTRACT(MONTH FROM created_on) = 11 THEN 'November' 
          WHEN EXTRACT(MONTH FROM created_on) = 12 THEN 'December' 
        END AS month
        , SUM(price) AS sales
        FROM order_items
        WHERE EXTRACT(YEAR FROM created_on) = ?
        GROUP BY month_number, month
        ORDER BY month_number DESC
      `, 
      {
        replacements: [year],
        type: sequelize.QueryTypes.SELECT
      }
    )

    res.send(data);
  } catch (e) {
    res.status(500).send({
      message:
        e.message || "Some error occurred while retrieving monthly sales revenue."
    });
  }
};

// Retrieve monthly sales numbers of specified year.
exports.findTotalSalesRevenueByYear = async (req, res) => {
  try {
    const year = req.params.year;
  
    // Execute a custom prepared statement query.
    const data = await sequelize.query(
      `
        SELECT
        SUM(price) AS sales
        FROM order_items
        WHERE EXTRACT(YEAR FROM created_on) = ?
      `, 
      {
        replacements: [year],
        type: sequelize.QueryTypes.SELECT
      }
    )

    res.send(data[0]);
  } catch (e) {
    res.status(500).send({
      message:
        e.message || "Some error occurred while retrieving sales revenue by year."
    });
  }
};

// Retrieve monthly sales numbers of specified year.
exports.findUnitsSoldByYear = async (req, res) => {
  try {
    const year = req.params.year;
  
    // Execute a custom prepared statement query.
    const data = await sequelize.query(
      `
        SELECT
        SUM(quantity) AS units_sold
        FROM order_items
        WHERE EXTRACT(YEAR FROM created_on) = ?
      `, 
      {
        replacements: [year],
        type: sequelize.QueryTypes.SELECT
      }
    )

    res.send(data[0]);
  } catch (e) {
    res.status(500).send({
      message:
        e.message || "Some error occurred while retrieving units sold by year."
    });
  }
};

// Retrieve top sellers based on quantity sold.
exports.findTopSellersByYear = async (req, res) => {
  try {
    const year = req.params.year;
  
    // Execute a custom prepared statement query.
    const data = await sequelize.query(
      `
        SELECT username, SUM(quantity) AS number_of_sales
        FROM order_items t1
        INNER JOIN users t2 ON t2.id = t1.seller_id
        WHERE EXTRACT(YEAR FROM t1.created_on) = ?
        GROUP BY username
        ORDER BY number_of_sales DESC
        LIMIT 10
      `, 
      {
        replacements: [year],
        type: sequelize.QueryTypes.SELECT
      }
    )

    res.send(data);
  } catch (e) {
    res.status(500).send({
      message:
        e.message || "Some error occurred while retrieving top sellers."
    });
  }
};

// Delete a Cart Item with the specified id
exports.delete = (req, res) => {
  try {
    const id = req.params.id;
    OrderItem.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Order Item was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Order Item with id=${id}. Order Item was not found!`
          });
        }
      })
  } catch (e) {
    res.status(500).send({
      message: "Could not delete Order Item with id=" + id
    });
  }
};
