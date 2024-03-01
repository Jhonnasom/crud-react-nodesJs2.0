const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "favorites-characters",
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const status = req.body.status;
  const species = req.body.species;
  const type = req.body.type;
  const gender = req.body.gender;
  const image = req.body.image;
  const url = req.body.url;
  const created = req.body.created;

  db.query(
    "SELECT id FROM favorites where name='" + name + "'",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        const existCharacter = result.length;
        if (existCharacter === 0) {
          console.log("registrando");
          db.query(
            "INSERT INTO favorites(name,status,species,type,gender,image,url,created) VALUES(?,?,?,?,?,?,?,?)",
            [name, status, species, type, gender, image, url, created],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                res.send(result);
              }
            }
          );
        } else {
          res.send();
        }
      }
    }
  );
});

app.get("/characters", (req, res) => {
  db.query("SELECT * FROM favorites", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const status = req.body.status;
  const species = req.body.species;
  const type = req.body.type;
  const gender = req.body.gender;
  const image = req.body.image;
  const url = req.body.url;
  const created = req.body.created;

  db.query(
    "UPDATE favorites SET name=?,status=?,species=?,type=?,gender=?,image=?,url=?,created=? WHERE id=?",
    [name, status, species, type, gender, image, url, created, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM favorites WHERE id=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Corriendo en el puerto 3001");
});
