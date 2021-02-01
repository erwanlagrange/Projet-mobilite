const sql = require("./db.model.js");

// constructor
const Destination = function(destination) {
    this.universite = destination.universite;
    this.pays = destination.pays;
    this.ville = destination.ville;
    this.coordonnees = destination.coordonnees;
};

Destination.create = (newDestination, result) => {
  sql.query("INSERT INTO Destinations SET ?", newDestination, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Destination: ", { id: res.insertId, ...newDestination });
    result(null, { id: res.insertId, ...newDestination });
  });
};

Destination.findById = (destinationId, result) => {
  sql.query(`SELECT * FROM Destinations WHERE id = ${destinationId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Destination: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Destination with the id
    result({ kind: "not_found" }, null);
  });
};

Destination.getAll = result => {
  sql.query("SELECT * FROM Destinations", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Destination: ", res);
    result(null, res);
  });
};

Destination.updateById = (id, destination, result) => {
  sql.query(
    "UPDATE Destinations SET universite = ?, pays = ?, ville = ?, coordonnees = ? WHERE id = ?",
    [destination.universite, destination.pays, destination.ville, destination.coordonnees, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Destination with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Etudiant: ", { id: id, ...etudiant });
      result(null, { id: id, ...etudiant });
    }
  );
};

Destination.remove = (id, result) => {
  sql.query("DELETE FROM Destinations WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Destination with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Destination with id: ", id);
    result(null, res);
  });
};

Destination.removeAll = result => {
  sql.query("DELETE FROM Destinationts", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Destinations`);
    result(null, res);
  });
};

module.exports = Destination;


/*{
    "universite":	"VT",
    "pays": "USA",
    "ville": "Blacksburg",
    "coordonnees": "37.228736, -80.423099"
  }*/