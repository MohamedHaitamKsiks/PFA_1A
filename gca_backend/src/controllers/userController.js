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
    //example request of how things going to work
    secret: (req, res) => {
        let responseBody = {
            connected: false,
            secret: {}
        };
        //if connected get all info
        if (req.session.userId) {
            responseBody.connected = true;
            userModel.getById(req.session.userId, (user) => {
                responseBody.secret = user;
                res.send(responseBody);
            });
        }
        else
            res.send(responseBody);
    }
}

module.exports = userController