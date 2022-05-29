const mysql = require('mysql');
const config = require("../config/default");

module.exports = {
    //do mysql query
    mysqlQuery: (query,event) => {
        var con = mysql.createConnection({
            host: config.mysql.host,
            user: config.mysql.username,
            password: config.mysql.password,
            database: config.mysql.database
        });

        con.connect(function (err) {
            if (err) throw err;
            con.query(query, (err, results) => {
                if (err) throw err;
                event(results);
            })
        });
    }
}