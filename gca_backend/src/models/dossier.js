const { mysqlQuery } = require("./database");

const dossierModel = {
    //constants
    societe: "so",
    particulier: "par",
    accidentTravail: "travail",
    accidentVoiture: "voiture",
    //methods
    //get join particulier
    joinso(event){
        mysqlQuery("select * from dossierso d join societe s on s.id=d.ids", event);
    },
    
    //get join particulier
    joinpar(event){
        mysqlQuery("select * from dossierpar d join particulier p on p.id=d.idp", event);
    },
    //get all dossier
    all(event) {
        mysqlQuery("SELECT * FROM dossierso UNION SELECT * FROM dossierpar", event);
    },
    //get all dossier with type
    getByType(type, event) {
        mysqlQuery("SELECT * FROM dossier" + type, event);
    },
    //get dossier with type and id
    getById(type, id, event){
        mysqlQuery("SELECT * FROM dossier"+ type + " WHERE id=" + id, (results) => {
            //dossier id is -1 if not found
            let dossier= { id: -1 };
            if (results.length > 0)
                dossier = results[0];
            event(dossier);
        });
    },
    //insert new dossier
    insert(dossier) {
        let query = "INSERT INTO dossier" + dossier.client.type ;
        if (dossier.client.type == this.societe)
            query += "(ids, nature, info)";
        else
            query += "(idp, nature, info)";
        query += "VALUES (" + dossier.client.id + ",'" + dossier.nature + "','" + dossier.info + "')";
        mysqlQuery(query, (results) => {
            console.log("new dossier inserted")
        });
    },
    //update existing dossier
    update(dossier) {
        let query = "UPDATE dossier" + dossier.client.type + " ";
        if (dossier.client.type == this.societe)
            query += "SET ids=" + dossier.client.id + ",";
        else
            query += "SET idp=" + dossier.client.id + ",";
        query += "nature='" + dossier.nature + "', info='" + dossier.info + "' ";
        query += "WHERE id=" + dossier.id;
        //make query
        mysqlQuery(query, (results) => {
            console.log("dossier n " + dossier.id + "was updated")
        });
    },
    //delete by id and type
    delete(dossier) {
        let query = "DELETE FROM dossier" + dossier.type + " ";
        query += "WHERE id=" + dossier.id;
        //make query
        mysqlQuery(query, (results) => {
            console.log("dossier n " + dossier.id + "was deleted")
        });
    },
}

module.exports = dossierModel;