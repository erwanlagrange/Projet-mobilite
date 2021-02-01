const express = require('express');

const etudiantRouter = express.Router();

const etudiantController = require('../controllers/etudiant.controller');


// Create a new Etudiants
etudiantRouter.post("/etudiants", etudiantController.create);

// login function
etudiantRouter.post("/loginjwt", etudiantController.loginjwt);

// login function
etudiantRouter.post("/login", etudiantController.login);

// Retrieve all Etudiants
etudiantRouter.get("/etudiants", etudiantController.findAll);

// Retrieve a single Etudiant with etudiantId
etudiantRouter.get("/etudiants/:etudiantId", etudiantController.findOne);

// Update a Etudiant with etudiantId
etudiantRouter.put("/etudiants/:etudiantId", etudiantController.update);

// Delete a Etudiant with etudiantId
etudiantRouter.delete("/etudiants/:etudiantId", etudiantController.delete);

// Delete all Etudiant
etudiantRouter.delete("/etudiants", authenticateToken, etudiantController.deleteAll);


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, email) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.email = email
      next()
    })
  };


module.exports = etudiantRouter;