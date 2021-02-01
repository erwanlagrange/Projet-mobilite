const express = require('express');

const demandeRouter = express.Router();

const demandeController = require('../controllers/demande.controller');


// Create a new Demandes
demandeRouter.post("/demandes", demandeController.create);

// Retrieve all Demandes
demandeRouter.get("/demandes", demandeController.findAll);

// Retrieve all Demandes accepte
demandeRouter.get("/demandesaccepte", demandeController.findAllAccepte);

// Retrieve a single Demande with demandeId
demandeRouter.get("/demandes/:demandeId", demandeController.findOne);

// Retrieve Demandes with destinationId
demandeRouter.get("/demandes/destination/:destinationId", demandeController.findByDestination);

// Retrieve Demandes with etudiantId
demandeRouter.get("/demandes/etudiant/:etudiantId", demandeController.findByEtudiant);

// Update a Demande with demandeId
demandeRouter.put("/demandes/:demandeId", demandeController.update);

// Delete a Demande with demandeId
demandeRouter.delete("/demandes/:demandeId", demandeController.delete);

// Create a new Demande
demandeRouter.delete("/demandes", demandeController.deleteAll);

module.exports = demandeRouter;