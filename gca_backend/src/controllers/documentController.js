//document controller
const documentController = {
    all: (req, res) => {
        let bodyResponse = {
            connected: false,
            documents: []
        }
        //if not connected
        if (!req.session.username) {
            res.send(bodyResponse);
            return;
        }
        // get documents data
        bodyResponse.connected = true;
        bodyResponse.documents = [
            {
                id: 0,
                name: 'Accident de voiture',
                client: 'Ksiks Mohamed Haitam',
                finished: false
            },
            {
                id: 1,
                name: 'Accident de travail',
                client: 'Othman Messaoudi',
                finished: false
            }
        ]
        //
        console.log(bodyResponse.documents);
        res.send(bodyResponse);
    }
}

module.exports = documentController;