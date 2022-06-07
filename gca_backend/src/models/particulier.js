const { mysqlQuery } = require("./database");

const particulierModel = {
    //methods
    //get all particuliers
    all(event) {

        mysqlQuery("SELECT * FROM particulier", event);
    },
    //get searched
    search(particulier, event) {
        let query = "select * from particulier where nom='"+ particulier.nom +"'and prenom='" + particulier.prenom + "'";
        mysqlQuery(query, event);         
    },
    //insert new particulier
    insert(particulier) {
        let query = "INSERT INTO particulier (nom, prenom, cin) VALUES ('" + particulier.nom + "','" + particulier.prenom + "','" + particulier.cin + "')";
        mysqlQuery(query, (results)=>{
            console.log("new particulier insterted");
        });
    },
    deleteById(id) {
        let query = "DELETE FROM particulier WHERE id=" + id;
        mysqlQuery(query, (results) => {
            console.log("a particulier was removed");
        });
    }
}

module.exports = particulierModel;