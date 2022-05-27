const express = require('express');

const router = express.Router();

const documentController = require('../controllers/documentController.js');


router.get('/all', documentController.all);


module.exports = router;