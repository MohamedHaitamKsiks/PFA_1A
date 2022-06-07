const express = require('express');

const router = express.Router();

const dossierController = require('../controllers/dossierController.js');
//join dossier societe
router.get('/joinso', dossierController.joinso);

//join dossier particulier
router.get('/joinpar', dossierController.joinpar);

//get all dossier
router.get('/all', dossierController.all);

//create new dossier
router.post('/create', dossierController.create);

//edit old dossier
router.post('/edit', dossierController.edit);

//delete dossier
router.post('/delete', dossierController.delete);

//get dossier by type
router.get('/:type', dossierController.getByType);

//get dossier by type and id
router.get('/:type/:id', dossierController.getById);

module.exports = router;