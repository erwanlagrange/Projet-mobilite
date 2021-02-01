const express = require('express');

const destinationRouter = express.Router();

const destinationController = require('../controllers/destination.controller');


// Create a new destinations
destinationRouter.post("/destinations", destinationController.create);

// Retrieve all destinations
destinationRouter.get("/destinations", destinationController.findAll);

// Retrieve a single destinations with destinationId
destinationRouter.get("/destinations/:destinationId", destinationController.findOne);

// Update a destinations with destinationId
destinationRouter.put("/destinations/:destinationId", destinationController.update);

// Delete a destinations with destinationId
destinationRouter.delete("/destinations/:destinationId", destinationController.delete);

// Create a new destinations
destinationRouter.delete("/destinations", destinationController.deleteAll);

module.exports = destinationRouter;