
//user controller
const userController= {
    login: (req, res) => {

        console.log(req.body);

        let responseBody = {
            accepted: false,

        }

        let username = req.body.username;
        let password = req.body.password;

        if (username === 'admin' && password === 'admin') {
            req.session.username = username;
            responseBody.accepted = true;
        }

        res.send(responseBody)
    },
    logout: (req, res) => {
        if (req.session.username){
            req.session.destroy();
            res.send('ok');
        }else{
            res.send('none');
        }
    },
    //example request of how things going to work
    secret: (req, res) => {
        let responseBody = {};
        if (req.session.username) {
            responseBody.connected = true;
            responseBody.secret = 'MY pp is MASSIVE!';
        }
        else {
            responseBody.connected = false;
            responseBody.secret = '';
        }
        res.send(responseBody);
    }
}

module.exports = userController