const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController.js');

router.post('/login', userController.login);

router.post('/logout', userController.logout);

router.get('/secret', userController.secret);


module.exports = router;