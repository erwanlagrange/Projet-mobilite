const Etudiant = require("../models/etudiant.model");
//const { notify } = require("../routes/etudiant.route");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

// Create and Save a new etudiant
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  try {
    // hash the password
    const hashedPassword = await bcrypt.hash(req.body.motdepasse, 10);
      
    // Create a Etudiant
    const etudiant = new Etudiant({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        motdepasse: hashedPassword,
        promotion: req.body.promotion,
        isAdmin: false
      });

      Etudiant.create(etudiant, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Etudiant."
          });
        else res.send(data);
      });

  } catch {
    res.status(500).send({
      message:
        err.message || "Some error occurred while crypting the password."
    });
  }
};

//login JWT
exports.loginjwt = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const username = req.body.email;
  const user = { name: username};
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken: accessToken });


};

// Login
exports.login = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
      try {

        let passwordhashDb ='';

        // identifie si l'user existe ou pas et recupère le mdphash en base
        Etudiant.findByEmail(req.body.email, async (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Etudiant with email ${req.body.email}.`
              });
            } else {
              res.status(500).send({
                message: `Error retrieving Etudiant with email ${req.body.email}.`
              });
            }
          } else {
            passwordhashDb = data[0].motdepasse;
            console.log("req.body.motdepasse", req.body.motdepasse);
            console.log("passwordhashDb", passwordhashDb);

            if(await bcrypt.compare(req.body.motdepasse, passwordhashDb)) {
              // Create a Etudiant
              const etudiant = new Etudiant({
                email: req.body.email,
                motdepasse: passwordhashDb
              });
              Etudiant.checkLogin(etudiant, (err, data) => {
                if (err)
                  res.status(500).send({
                    message:
                      err.message || "Some error occurred while creating the Etudiant."
                  });
                else {
                  console.log( data);
                  const user = { email: req.body.email};
                  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
                  const isAdmin = data.isAdmin;
                  const id_etudiant = data.ID;
                  res.status(200).send({
                    message:
                      "Connexion réussie",
                    accessToken: 
                      accessToken,
                    isAuth:
                      true,
                    isAdmin:
                      isAdmin,
                    id_etudiant:
                      id_etudiant
                  }); 
                }
              });
        
            } else {
              res.status(400).send({
                message:
                  "Not Allowed"
              });
            }
          }
        });

      } catch {
        res.status(500).send()
      }
  
};

// Retrieve all Etudiant from the database.
exports.findAll = (req, res) => {
    Etudiant.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving etudiants."
          });
        else res.send(data);
      });
};

// Find a single Etudiant with a etudiantId
exports.findOne = (req, res) => {
    Etudiant.findById(req.params.etudiantId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Etudiant with id ${req.params.etudiantId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Etudiant with id " + req.params.etudiantId
            });
          }
        } else res.send(data);
      });
};

// Update a Etudiant identified by the etudiantId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Etudiant.updateById(
    req.params.etudiantId,
    new Etudiant(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Etudiant with id ${req.params.etudiantId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Etudiant with id " + req.params.etudiantId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Etudiant with the specified etudiantId in the request
exports.delete = (req, res) => {
    Etudiant.remove(req.params.etudiantId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Etudiant with id ${req.params.etudiantId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Etudiant with id " + req.params.etudiantId
            });
          }
        } else res.send({ message: `Etudiant was deleted successfully!` });
      });
  
};

// Delete all Etudiants from the database.
exports.deleteAll = (req, res) => {
    Etudiant.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Etudiants."
          });
        else res.send({ message: `All Etudiants were deleted successfully!` });
      });
};