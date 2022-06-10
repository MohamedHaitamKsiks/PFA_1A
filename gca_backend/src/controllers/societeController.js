const societeModel = require("../models/societe")

const societeController = {
    //get all societe
    all: (req, res) => {
        societeModel.all((societes) => {
            res.send(societes);
        })
    },
    //create societe
    create: (req, res) => {
        let bodyResponse = {
            connected: false,
        }
        //if not connected
        if (!req.session.userId) {
            res.send(bodyResponse);
            return;
        }
        //insert societe
        bodyResponse.connected = true;
        let societe = req.body.societe;
        societeModel.insert(societe);
        res.send(bodyResponse);
    },
    delete: (req, res) => {
        let bodyResponse = {
            connected: false
        }
        //if not connected
        if (!req.session.userId) {
            res.send(bodyResponse);
            return;
        }
        //insert societe
        bodyResponse.connected = true;
        societeModel.deleteById(req.body.id);
        res.send(bodyResponse);
    }
}

module.exports = societeController;