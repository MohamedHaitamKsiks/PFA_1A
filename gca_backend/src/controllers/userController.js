const userModel = require('../models/user');

//user controller
const userController= {
    login: (req, res) => {

        console.log(req.body);

        let responseBody = {
            accepted: false,
        }

        let username = req.body.username;
        let password = req.body.password;

        userModel.getByUsername(username, (user) => {
            if (user.id > -1 && password === user.password) {
                req.session.userId = user.id;
                responseBody.accepted = true;
            }
            res.send(responseBody)
        });
    },
    logout: (req, res) => {
        if (req.session.userId){
            req.session.destroy();
            res.send('ok');
        }else{
            res.send('none');
        }
    },
    //check if is connected
    isConnected: (req, res) => {
        let responseBody = {
            connected: false,
        };
        //if connected 
        if (req.session.userId) {
            responseBody.connected = true;
        }
        
        res.send(responseBody);
    }
}

module.exports = userController