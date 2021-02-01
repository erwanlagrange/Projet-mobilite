const Destination = require("../models/destination.model");

// Create and Save a new Destination
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Destination
  const destination = new Destination({
    universite: req.body.universite,
    pays: req.body.pays,
    ville: req.body.ville,
    coordonnees: req.body.coordonnees
  });

  // Save Destination in the database
  Destination.create(destination, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the destination."
      });
    else res.send(data);
  });
};

// Retrieve all Destination from the database.
exports.findAll = (req, res) => {
  Destination.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Destinations."
          });
        else res.send(data);
      });
};

// Find a single Destination with a destinationId
exports.findOne = (req, res) => {
  Destination.findById(req.params.destinationId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Destination with id ${req.params.destinationId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Destination with id " + req.params.destinationId
            });
          }
        } else res.send(data);
      });
};

// Update a Destination identified by the destinationId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Destination.updateById(
    req.params.destinationId,
    new Destination(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Destination with id ${req.params.destinationId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Destination with id " + req.params.destinationId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Destination with the specified destinationId in the request
exports.delete = (req, res) => {
  Destination.remove(req.params.destinationId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Destination with id ${req.params.destinationId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Destination with id " + req.params.destinationId
            });
          }
        } else res.send({ message: `Destination was deleted successfully!` });
      });
  
};

// Delete all Destinations from the database.
exports.deleteAll = (req, res) => {
  Destination.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Destinations."
          });
        else res.send({ message: `All Destinations were deleted successfully!` });
      });
};