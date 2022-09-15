const { sequelize } = require("../models");

const db = require("../models");
const Item = db.items;
const Op = db.Sequelize.Op;

// Create and Save a new Item
exports.create = (req, res) => {
  try {
    if (req.body.sellerId === null || !req.body.sellerId || req.body.name === null || !req.body.name || req.body.price === null || !req.body.price || req.body.price === 0) {
      res.status(400).send({
        message: "Invalid Item Fields"
      });
    }

    const item = {
      seller_id: req.body.sellerId,
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      images: req.body.images
    };

    Item.create(item)
    .then(data => {
      res.send(data);
    })
  } catch (e) {
    res.status(500).send({
      message:
        e.message || "Some error occurred while creating the Item."
    });
  }  
};
// Retrieve all Items from the database.
exports.findAll = (req, res) => {
  try {
    Item.findAll()
    .then(data => {
      res.send(data);
    })
  } catch (e) {
    res.status(500).send({
      message:
        e.message || "Some error occurred while searching items."
    });
  }
};

// Retrieve Items by search string. 
exports.findBySearch = (req, res) => {
  try {
    const searchString = req.params.searchString;

    let condition = searchString ? { name: { [Op.iLike]: `%${searchString}%` } } : null;
    Item.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
  } catch (e) {
    res.status(500).send({
      message:
        e.message || "Some error occurred while searching items."
    });
  } 
};

// Find a single Item with an id
exports.findByItemId = (req, res) => {
  try {
    const id = req.params.itemId;
    Item.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Item with id=${id}.`
          });
        }
      })
  } catch (e) {
    res.status(500).send({
      message: "Error retrieving Item with id=" + id
    });
  }
};

// Find Items by Seller ID
exports.findBySellerId = (req, res) => {
  try {
    const sellerId = req.params.sellerId;
    let condition = sellerId ? { seller_id: sellerId } : null;
    Item.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
  } catch (e) {
    res.status(500).send({
      message:
        e.message || "Some error occurred while retrieving items."
    });
  }
};

// Retrieve most popular items based on numbers sold.
exports.findPopularItemsByYear = async (req, res) => {
  try {
    const year = req.params.year;
  
    // Execute a custom prepared statement query.
    const data = await sequelize.query(
      `
        SELECT name, number_sold
        FROM items
        WHERE EXTRACT(YEAR FROM created_on) = ?
        ORDER BY number_sold DESC
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
      e.message || "Some error occurred while retrieving popular items."
    });
  }
};

// Update an Item by the id in the request
exports.update = (req, res) => {
  try {
    const id = req.params.id;

    Item.update(req.body, {
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Item was updated successfully."
        });
      } else {
        res.send({
          message: `Could not update Item with id=${id}.`
        });
      }
    })
  } catch (e) {
    res.status(500).send({
      message: "Error updating Item with id=" + id
    });
  }
};
// Delete a Item with the specified id in the request
exports.delete = (req, res) => {
  try {
    const id = req.params.id;
    Item.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Item was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Item with id=${id}. Item was not found!`
          });
        }
      })
  } catch (e) {
    res.status(500).send({
      message: "Could not delete Item with id=" + id
    });
  }
};