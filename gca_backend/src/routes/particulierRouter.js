const express = require('express');

const router = express.Router();

const particulierController = require('../controllers/particulierController.js');


router.get('/all', particulierController.all);

router.post('/create', particulierController.create);

router.post('/delete', particulierController.delete);


module.exports = router;