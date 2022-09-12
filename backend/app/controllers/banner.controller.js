const db = require("../models");
const Banner = db.banners;
const Op = db.Sequelize.Op;

// Create and Save a new Banner
exports.create = (req, res) => {
  try {
    if (!req.body.name || req.body.name === '') {
      res.status(201).send({
        message: "Invalid banner name."
      });
    }

    if (!req.body.image || req.body.image === '') {
      res.status(201).send({
        message: "Invalid banner image."
      });
    }

    // Check if the Banner name already exists.
    Banner.findAll({ where: { name: `${req.body.name}` } })
    .then(data => {
      if (data.length > 0) {
        // Banner already exists.
        res.status(201).send({
          message: "Banner name already exists."
        });
      } else {
        // Banner data is valid.
        const banner = {
          name: req.body.name,
          image: req.body.image
        };

        Banner.create(banner)
        .then(data => {
          res.send(data);
        })
      }
    })
  } catch (e) {
    res.status(500).send({
      message:
        e.message || "Some error occurred while creating the Banner."
    });
  }
};
// Retrieve Banner tied to a User from the database.
exports.findAll = (req, res) => {
  try {
    Banner.findAll()
    .then(data => {
      res.send(data);
    })
  } catch (e) {
    res.status(500).send({
      message:
        e.message || "Some error occurred while retrieving Banners."
    });
  }
};

// Retrieve Banner tied to a User from the database.
exports.findSelectedBanner = (req, res) => {
  try {
    Banner.findAll({ where: { selected: true } })
    .then(data => {
      res.send(data[0]);
    })
  } catch (e) {
    res.status(500).send({
      message:
        e.message || "Some error occurred while retrieving Banners."
    });
  }
};

// Find a single Banner Item with an id
exports.findOne = (req, res) => {
  try {
    const id = req.params.id;
    Banner.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Banner with id=${id}.`
        });
      }
    })
  } catch (e) {
    res.status(500).send({
      message: "Error retrieving Banner with id=" + id
    });
  }
};
// Update a Banner by the id in the request
exports.update = (req, res) => {
  try {
    const id = req.params.id;

    Banner.update(req.body, {
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Banner was updated successfully."
        });
      } else {
        res.send({
          message: `Could not update Banner with id=${id}.`
        });
      }
    })
  } catch (e) {
    res.status(500).send({
      message: "Error updating Banner with id=" + id
    });
  }
};
// Delete a Banner with the specified id in the request
exports.delete = (req, res) => {
  try {
    const id = req.params.id;
    Banner.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Banner was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Banner with id=${id}. Banner was not found!`
          });
        }
      })
  } catch (e) {
    res.status(500).send({
      message: "Could not delete Banner with id=" + id
    });
  }
};