const uuid = require('uuid')
const fs = require('fs');
const documentModel = require('../models/document');

const documentController = {
    //get documents
    get: (req, res) => {
        let bodyResponse = {
            connected: false,
            documents: []
        }
        //check connection
        if (!req.session.userId) {
            res.send(bodyResponse);
            return
        }

        bodyResponse.connected = true;
        //create dossier object
        let dossier = {
            type: req.params.type,
            id: req.params.id
        };

        documentModel.getByDossierId(dossier, (documents) => {
            bodyResponse.documents = documents;
            res.send(bodyResponse);
        });
    },
    //create new document
    create: (req, res) => {
        //verify if image was uploaded in tmp before insert + putting image in images folder
        let bodyResponse = {
            connected: false,
            fileExists: false
        }
        //check connection
        if (!req.session.userId) {
            res.send(bodyResponse);
            return;
        }
        //create document
        bodyResponse.connected = true;
        let document = req.body.document;
        let imagePath = 'private/tmp/' + document.chemin;
        //check if file exists
        if(!fs.existsSync(imagePath)){
            res.send(bodyResponse);
            return;
        }

        bodyResponse.fileExists = true;
        //insert data
        documentModel.insert(document);
        //copy tmp to main
        fs.copyFile(imagePath, 'private/images/' + document.chemin, (err) => {
            if (err) throw err;
        })

        //send data
        res.send(bodyResponse);

    },
    //upload document picture
    upload: (req, res) => {
        let bodyResponse = {
            connected: false,
            imageName: ''
        }

        if (!req.session.userId){
            res.send(bodyResponse);
            return
        }

        bodyResponse.connected = true;

        bodyResponse.imageName = uuid.v4() + '.png';
        console.log(bodyResponse.imageName);

        let filePath = 'private/tmp/' + bodyResponse.imageName

        fs.writeFile(filePath, req.files.image.data, (err) => {
            if (err) throw err;
            //wait 5 mins to delete file
            setTimeout(() => {
                fs.rm(filePath, (err) => {
                    if (err) throw err;
                });
            }, 5 * 60 * 1000);
        });

        res.send(bodyResponse);
    },
    //get image
    getImage: (req, res) => {
        //verify conenction
        if (!req.session.userId) {
            res.send('unaccessible data');
            return
        }

        let imagePath = 'private/' + req.params.folder + '/' + req.params.file;
        fs.readFile(imagePath, (err, data) => {
            res.send(data);
        });
    },
    //delete document
    delete: (req, res) => {
        let bodyResponse = {
            connected: false,
        }
        //check connection
        if (!req.session.userId) {
            res.send(bodyResponse);
            return
        }

        bodyResponse.connected = true;

        documentModel.delete(req.body.document);

        res.send(bodyResponse);
    }

}

module.exports = documentController;