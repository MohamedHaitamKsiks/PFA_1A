const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController.js');

router.post('/login', userController.login);

router.post('/logout', userController.logout);

router.get('/connected', userController.isConnected);


module.exports = router;