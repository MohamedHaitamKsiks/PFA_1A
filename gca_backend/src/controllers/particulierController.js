const particulierModel = require("../models/particulier")

const particulierController = {
    //get all particulier
    all: (req, res) => {
        
        particulierModel.all((particuliers) => {
            res.send(particuliers);
        })
    },
    //create particulier
    create: (req, res) => {
        let bodyResponse = {
            connected: false
        }
        //if not connected
        if (!req.session.userId) {
            res.send(bodyResponse);
            return;
        }
        //insert particulier
        bodyResponse.connected = true;
        let particulier = req.body.particulier;
        particulierModel.insert(particulier);
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
        //insert particulier
        bodyResponse.connected = true;
        particulierModel.deleteById(req.body.id);
        res.send(bodyResponse);
    }
}

module.exports = particulierController;