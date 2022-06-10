const { mysqlQuery } = require("./database");

const documentModel = {
    //constants
    societe: "so",
    particulier: "par",
    //methods
    //get documents of a specific dossier
    getByDossierId(dossier, event) {
        if (dossier.type == this.societe)
            mysqlQuery("SELECT * FROM documentso WHERE idds=" + dossier.id, event);
        else
            mysqlQuery("SELECT * FROM documentpar WHERE iddp=" + dossier.id, event);
    },
    //insert new document
    insert(document) {
        let query = "INSERT INTO document" + document.dossier.type + " ";
        if (document.dossier.type == this.societe)
            query += "(idds, nature, chemin)";
        else
            query += "(iddp, nature, chemin)";
        query += "VALUES (" + document.dossier.id + ",'" + document.nature + "','" + document.chemin + "')";
        mysqlQuery(query, (results) => {
            console.log("new document inserted")
        });
    },
    //delete docuement
    delete(document) {
        mysqlQuery("DELETE FROM document" + document.type + " WHERE id=" + document.id, (results) => {
            console.log("document" + document + " deleted")
        });
    }
};

module.exports = documentModel;