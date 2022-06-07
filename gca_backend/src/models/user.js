const { mysqlQuery } = require('./database');


const userModel = {
    all :(event) => {
        mysqlQuery("SELECT * FROM user", (results) => {
            event(results);
        });
    },
    //get user by it's username
    getByUsername: (username, event) => {
        mysqlQuery("SELECT * FROM user WHERE username='" + username + "'", (results) => {
            //user id is -1 if not found
            let user = { id: -1 };
            if (results.length > 0)
                user = results[0];
            event(user);
        });
    },
    //get user by it's username
    getById: (id, event) => {
        mysqlQuery("SELECT * FROM user WHERE id=" + id, (results) => {
            //user id is -1 if not found
            let user = { id: -1 };
            if (results.length > 0)
                user = results[0];
            event(user);
        });
    },
}

module.exports = userModel;