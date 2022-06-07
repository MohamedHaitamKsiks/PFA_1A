const express = require('express');

const router = express.Router();

const societeController = require('../controllers/societeController.js');


router.get('/all', societeController.all);

router.post('/create', societeController.create);

router.post('/delete', societeController.delete);

module.exports = router;