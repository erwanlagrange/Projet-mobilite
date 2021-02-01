const express = require('express');
const app = express();

app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const dbRoutes = require('./routes/db.route');
app.use('/', dbRoutes);

const etudiantRoutes = require('./routes/etudiant.route');
app.use('/', etudiantRoutes)

const destinationRoutes = require('./routes/destination.route');
app.use('/', destinationRoutes)

const demandeRoutes = require('./routes/demande.route');
app.use('/', demandeRoutes)

module.exports = app;