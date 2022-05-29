const express = require('express');
const fileUpload = require('express-fileupload');


const router = express.Router();

const documentController = require('../controllers/documentController.js');

//get documents of a dossier
router.get('/:type/:id', documentController.get);

//create new document
router.post('/create', documentController.create);

//upload document
router.post('/upload', fileUpload(), documentController.upload);

//get image document
router.get('/image/:folder/:file', documentController.getImage);

module.exports = router;