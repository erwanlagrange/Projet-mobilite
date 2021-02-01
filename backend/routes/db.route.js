const express = require('express');

const router = express.Router();
const dbController = require('../controllers/db.controller');

router.get('/db', dbController.getAll); 


module.exports = router;