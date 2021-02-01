const Demande = require("../models/demande.model");

// Create and Save a new demande
exports.create = (req, res) => {

  console.log("error test Erwan: ",req.body);


  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Demande
  const demande = new Demande({
    id_etudiant: req.body.id_etudiant,
    id_destination: req.body.id_destination,
    date_soumission: req.body.date_soumission,
    date_debut: req.body.date_debut,
    date_fin: req.body.date_fin,
    statut: req.body.statut
  });

  // Save Demande in the database
  Demande.create(demande, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Demande."
      });
    else res.send(data);
  });
};

// Retrieve all Demande from the database.
exports.findAll = (req, res) => {
  Demande.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Demandes."
          });
        else res.send(data);
      });
};

// Retrieve all Demande Accepted from the database.
exports.findAllAccepte = (req, res) => {
  Demande.getAllAccepte((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Demandes."
          });
        else res.send(data);
      });
};

// Find a single Demande with a demandeId
exports.findOne = (req, res) => {
  Demande.findById(req.params.demandeId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Demande with id ${req.params.demandeId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Demande with id " + req.params.demandeId
            });
          }
        } else res.send(data);
      });
};

// Find a single Demande with a etudiantId
exports.findByEtudiant = (req, res) => {
  Demande.findByIdEtudiant(req.params.etudiantId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found etudiantId with id ${req.params.etudiantId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving etudiantId with id " + req.params.etudiantId
            });
          }
        } else res.send(data);
      });
};

// Find a single Demande with a destinationId
exports.findByDestination = (req, res) => {
  Demande.findByIdDestination(req.params.destinationId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found destinationId with id ${req.params.destinationId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving destinationId with id " + req.params.destinationId
            });
          }
        } else res.send(data);
      });
};

// Update a Demande identified by the demandeId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Demande.updateById(
    req.params.demandeId,
    new Demande(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Demande with id ${req.params.demandeId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Demande with id " + req.params.demandeId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Demande with the specified demandeId in the request
exports.delete = (req, res) => {
  Demande.remove(req.params.demandeId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Demande with id ${req.params.demandeId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Demande with id " + req.params.demandeId
            });
          }
        } else res.send({ message: `Demande was deleted successfully!` });
      });
  
};

// Delete all Demandes from the database.
exports.deleteAll = (req, res) => {
  Demande.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Demandes."
          });
        else res.send({ message: `All Demandes were deleted successfully!` });
      });
};