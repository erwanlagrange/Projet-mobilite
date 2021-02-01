const sql = require("./db.model.js");

// constructor
const Etudiant = function(etudiant) {
    this.nom = etudiant.nom;
    this.prenom = etudiant.prenom;
    this.email = etudiant.email;
    this.motdepasse = etudiant.motdepasse;
    this.promotion = etudiant.promotion;
    this.isAdmin = false;
};

Etudiant.create = (newEtudiant, result) => {
  sql.query("INSERT INTO etudiants SET ?", newEtudiant, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Etudiant: ", { id: res.insertId, ...newEtudiant });
    result(null, { id: res.insertId, ...newEtudiant });
  });
};

Etudiant.findByEmail = (etudiantEmail, result) => {
  sql.query(`SELECT * FROM Etudiants WHERE email = "${etudiantEmail}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Etudiant: ", res[0]);
      //console.log("res[0]", res[0]);
      result(null, res);
      return;
    }

    // not found Etudiant with the id
    result({ kind: "not_found" }, null);
    //result(null, res); 
  });
};

Etudiant.findById = (etudiantId, result) => {
  sql.query(`SELECT * FROM Etudiants WHERE id = ${etudiantId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Etudiant: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Etudiant with the id
    result({ kind: "not_found" }, null);
  });
};

Etudiant.checkLogin = (etudiant, result) => {
  sql.query(
    "SELECT * FROM Etudiants WHERE email = ? AND motdepasse = ?",
    [etudiant.email, etudiant.motdepasse],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

    if (res.length) {
      console.log("found Etudiant: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Etudiant with the id
    result({ kind: "not_found" }, null);
  });
};

Etudiant.getAll = result => {
  sql.query("SELECT * FROM Etudiants", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Etudiant: ", res);
    result(null, res);
  });
};

Etudiant.updateById = (id, etudiant, result) => {
  sql.query(
    "UPDATE Etudiants SET nom = ?, prenom = ?, email = ?, motdepasse = ?, promotion = ? WHERE id = ?",
    [etudiant.nom, etudiant.prenom, etudiant.email, etudiant.motdepasse, etudiant.promotion, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Etudiant with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Etudiant: ", { id: id, ...etudiant });
      result(null, { id: id, ...etudiant });
    }
  );
};

Etudiant.remove = (id, result) => {
  sql.query("DELETE FROM Etudiants WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Etudiant with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Etudiant with id: ", id);
    result(null, res);
  });
};

Etudiant.removeAll = result => {
  sql.query("DELETE FROM Etudiants", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Etudiants`);
    result(null, res);
  });
};

module.exports = Etudiant;


/*{
    "nom":	"Lagrange",
    "prenom": "Erwan",
    "email": "erwan.lagrange@mail.com",
    "motdepasse": "motdepasse",
    "promotion": "FISE3"
}*/