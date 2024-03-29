const { sequelize } = require("../models");

const db = require("../models");
const Tag = db.tags;
const Op = db.Sequelize.Op;

// Create and Save a new Tag
exports.create = (req, res) => {
  try {
    if (!req.body.name || req.body.name === '') {
      res.status(201).send({
        message: "Invalid tag name."
      });
    }

    // Check if the tag name already exists.
    Tag.findAll({ where: { name: `${req.body.name}` } })
    .then(data => {
      if (data.length > 0) {
        // Tag already exists.
        res.status(201).send({
          message: "Tag name already exists."
        });
      } else {
        // Tag data is valid.
        const tag = {
          name: req.body.name
        };

        Tag.create(tag)
        .then(data => {
          res.send(data);
        })
      }
    })
  } catch (e) {
    res.status(500).send({
      message:
        e.message || "Some error occurred while creating the Tag."
    });
  }
};

// Retrieve Tag tied to a User from the database.
exports.findAll = (req, res) => {
  try {
    Tag.findAll()
    .then(data => {
      res.send(data);
    })
  } catch (e) {
    res.status(500).send({
      message:
        e.message || "Some error occurred while retrieving Tags."
    });
  }
};

// Find a single Tag Item with an id
exports.findOne = (req, res) => {
  try {
    const id = req.params.id;
    Tag.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tag with id=${id}.`
        });
      }
    })
  } catch (e) {
    res.status(500).send({
      message: "Error retrieving Tag with id=" + id
    });
  }
};

// Retrieve most popular tags based on sales.
exports.findPopularTagsByYear = async (req, res) => {
  try {
    const year = req.params.year;
  
    // Execute a custom prepared statement query.
    const data = await sequelize.query(
      `
        SELECT t3.name, SUM(number_sold * price) AS sales
        FROM items t1
        INNER JOIN item_tags t2 ON t2.item_id = t1.id
        INNER JOIN tags t3 ON t3.id = t2.tag_id
        WHERE EXTRACT(YEAR FROM t1.created_on) = ?
        GROUP BY t3.name
        ORDER BY sales DESC
        LIMIT 10
      `, 
      {
        replacements: [year],
        type: sequelize.QueryTypes.SELECT
      }
    )
    
    res.send(data);
  } catch (e) {
    console.log(e)
    res.status(500).send({
      message:
      e.message || "Some error occurred while retrieving popular tags."
    });
  }
};

// Update a Tag by the id in the request
exports.update = (req, res) => {
  
};
// Delete a Tag with the specified id in the request
exports.delete = (req, res) => {
  try {
    const id = req.params.id;
    Tag.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tag was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tag with id=${id}. Tag was not found!`
          });
        }
      })
  } catch (e) {
    res.status(500).send({
      message: "Could not delete Tag with id=" + id
    });
  }
};