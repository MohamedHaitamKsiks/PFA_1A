const dossierModel = require("../models/dossier");

//dossier controller
const dossierController = {
    joinso: (req, res) => {
        let bodyResponse = {
            connected: false,
            dossiers: []
        }
        //if not connected
        if (!req.session.userId) {
            res.send(bodyResponse);
            return;
        }
        dossierModel.joinso((dossiers) => {
            // get dossiers data
            bodyResponse.connected = true;
            bodyResponse.dossiers = dossiers
            //send response
            console.log(bodyResponse.dossiers);
            res.send(bodyResponse); 

        });
    },
    joinpar: (req, res) => {
        let bodyResponse = {
            connected: false,
            dossiers: []
        }
        //if not connected
        if (!req.session.userId) {
            res.send(bodyResponse);
            return;
        }
        dossierModel.joinpar((dossiers) => {
            // get dossiers data
            bodyResponse.connected = true;
            bodyResponse.dossiers = dossiers
            //send response
            console.log(bodyResponse.dossiers);
            res.send(bodyResponse); 

        });
    },
    //get all dossier
    all: (req, res) => {
        let bodyResponse = {
            connected: false,
            dossiers: []
        }
        //if not connected
        if (!req.session.userId) {
            res.send(bodyResponse);
            return;
        }
        dossierModel.all((dossiers) => {
            // get dossiers data
            bodyResponse.connected = true;
            bodyResponse.dossiers = dossiers
            //send response
            console.log(bodyResponse.dossiers);
            res.send(bodyResponse); 

        });
    },
    //get all dossier
    getByType: (req, res) => {
        let bodyResponse = {
            connected: false,
            dossiers: []
        }
        //if not connected
        if (!req.session.userId) {
            res.send(bodyResponse);
            return;
        }
        dossierModel.getByType(req.params.type, (dossiers) => {
            // get dossiers data
            bodyResponse.connected = true;
            bodyResponse.dossiers = dossiers
            //send response
            console.log(bodyResponse.dossiers);
            res.send(bodyResponse);

        });
    },
    //get specific dossier
    getById: (req, res) => {
        let bodyResponse = {
            connected: false,
            dossier: {}
        }
        //if not connected
        if (!req.session.userId) {
            res.send(bodyResponse);
            return;
        }
        dossierModel.getById(req.params.type, req.params.id, (dossier) => {
            // get dossiers data
            bodyResponse.connected = true;
            bodyResponse.dossier = dossier
            //send response
            console.log(bodyResponse.dossier);
            res.send(bodyResponse);

        });
    },
    //create new 
    create: (req, res) => {
        let bodyResponse = {
            connected: false,
        };
        //if not connected
        if (!req.session.userId) {
            res.send(bodyResponse);
            return;
        }
        //insert new dossier
        bodyResponse.connected = true;
        let dossier = req.body.dossier;
        dossierModel.insert(dossier);
        res.send(bodyResponse);
    },
    //edit a dossier by id
    edit: (req, res) => {
        let bodyResponse = {
            connected: false,
        };
        //if not connected
        if (!req.session.userId) {
            res.send(bodyResponse);
            return;
        }
        //insert new dossier
        bodyResponse.connected = true;
        let dossier = req.body.dossier;
        dossierModel.update(dossier);
        res.send(bodyResponse);
    },
    //delete a dossier by id
    delete: (req, res) => {
        let bodyResponse = {
            connected: false,
        };
        //if not connected
        if (!req.session.userId) {
            res.send(bodyResponse);
            return;
        }
        //insert new dossier
        bodyResponse.connected = true;
        let dossier = req.body.dossier;
        dossierModel.delete(dossier);
        res.send(bodyResponse);
    },
}

module.exports = dossierController;