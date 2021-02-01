const sql = require("./db.model.js");

// constructor
const Demande = function(demande) {
    this.id_etudiant = demande.id_etudiant;
    this.id_destination = demande.id_destination;
    this.date_soumission = demande.date_soumission;
    this.date_debut = demande.date_debut;
    this.date_fin = demande.date_fin;
    this.statut = demande.statut;
};

Demande.create = (newDemande, result) => {
  sql.query("INSERT INTO Demandes SET ?", newDemande, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Demandes: ", { id: res.insertId, ...newDemande });
    result(null, { id: res.insertId, ...newDemande });
  });
};

Demande.findById = (demandeId, result) => {
  sql.query(`SELECT demandes.id, nom, prenom, universite, pays, ville,DATE_FORMAT(date_soumission, \"%Y-%m-%d\") as date_soumission ,DATE_FORMAT(date_debut, \"%Y-%m-%d\") as date_debut , DATE_FORMAT(date_fin, \"%Y-%m-%d\") as date_fin, statut FROM demandes, etudiants, destinations WHERE id_etudiant = etudiants.id and id_destination = destinations.id and demandes.id = ${demandeId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Demande: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Demandes with the id
    result({ kind: "not_found" }, null);
  });
};

Demande.findByIdEtudiant = (id_etudiant, result) => {
  sql.query("SELECT demandes.id, universite, pays, ville,DATE_FORMAT(date_soumission, \"%Y-%m-%d\") as date_soumission ,DATE_FORMAT(date_debut, \"%Y-%m-%d\") as date_debut , DATE_FORMAT(date_fin, \"%Y-%m-%d\") as date_fin, statut FROM demandes, etudiants, destinations WHERE id_etudiant = etudiants.id and id_destination = destinations.id and id_etudiant = ?", [id_etudiant],  (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Demande: ", res);
      result(null, res);
      return;
    }

    // not found Demandes with the id_etudiant
    result({ kind: "not_found" }, null);
  });
};

Demande.findByIdDestination = (id_destination, result) => {
  sql.query(`SELECT * FROM Demandes WHERE id_destination = ${id_destination}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Demande: ", res);
      result(null, res);
      return;
    }

    // not found Demandes with the id_destination
    result({ kind: "not_found" }, null);
  });
};

Demande.getAll = result => {
  sql.query("SELECT demandes.id, nom, prenom, universite, pays, ville,DATE_FORMAT(date_soumission, \"%Y-%m-%d\") as date_soumission ,DATE_FORMAT(date_debut, \"%Y-%m-%d\") as date_debut , DATE_FORMAT(date_fin, \"%Y-%m-%d\") as date_fin, statut FROM demandes, etudiants, destinations WHERE id_etudiant = etudiants.id and id_destination = destinations.id", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Demande: ", res);
    result(null, res);
  });
};

Demande.getAllAccepte = result => {
  sql.query("SELECT nom, prenom, universite, pays, ville, Coordonnees FROM demandes, etudiants, destinations WHERE id_etudiant = etudiants.id and id_destination = destinations.id and statut = ?", ["Acceptée"] , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Demande: ", res);
    result(null, res);
  });
};

Demande.updateById = (id, demande, result) => {
  sql.query(
    "UPDATE Demandes SET date_debut = ?, date_fin = ?, statut = ? WHERE id = ?",
    [demande.date_debut, demande.date_fin, demande.statut, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Demande with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Demande: ", { id: id, ...demande });
      result(null, { id: id, ...demande });
    }
  );
};

Demande.remove = (id, result) => {
  sql.query("DELETE FROM Demandes WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Demande with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Demande with id: ", id);
    result(null, res);
  });
};

Demande.removeAll = result => {
  sql.query("DELETE FROM Demandes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Demandes`);
    result(null, res);
  });
};

module.exports = Demande;

/*
{
"id_etudiant": 6,
"id_destination": 3,
"date_soumission": "2020-10-20",
"date_debut": "2021-01-01",
"date_fin": "2021-06-30",
"statut": "demande"
}
*/