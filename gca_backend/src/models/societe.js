const { mysqlQuery } = require("./database");

const societeModel = {
    //methods
    //get all societes
    all(event) {
        mysqlQuery("SELECT * FROM societe", event);
    },
    //insert new societe
    insert(societe) {
        let query = "INSERT INTO societe (nom, matricule) VALUES ('" + societe.nom + "','" + societe.matricule + "')";
        mysqlQuery(query, (results)=>{
            console.log(societe + " insterted");
        });
    },
    deleteById(id) {
        let query = "DELETE FROM societe WHERE id=" + id;
        mysqlQuery(query, (results) => {
            console.log("a societe was removed");
        });
    }
}

module.exports = societeModel;