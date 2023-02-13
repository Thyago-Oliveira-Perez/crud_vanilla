const sqlite3 = require("sqlite3");
const express = require("express");
const cors = require("cors");

var app = express();

const HTTP_PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: ['http://127.0.0.1:5500']}))

app.listen(HTTP_PORT, () => {
  console.log("Server is listening on port " + HTTP_PORT);
});

const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Erro opening database " + err.message);
  } else {
    db.run(
      "CREATE TABLE employees( \
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
            name NVARCHAR(20) NOT NULL,\
            age NVARCHAR(3),\
            gender NVARCHAR(20)\
        )",
      (err) => {
        if (err) {
          console.log("Table already exists.");
          return;
        }
        let insert = "INSERT INTO employees (name, age, gender) VALUES (?,?,?)";
        db.run(insert, ["Deca", "40", "NON BINARI"]);
        db.run(insert, ["Thyago", "20", "MASCULINO"]);
      }
    );
  }
});

app.get("/employees", (req, res, next) => {
  db.all("SELECT * FROM employees", [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({ rows });
  });
});

app.post("/new_employee/", (req, res, next) => {
  var request = req.body;

  db.run(
    `INSERT INTO employees (name, age, gender) VALUES (?,?,?)`,
    [request.name, request.age, request.gender],

    function (err, result) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.status(201).json({
        id: this.lastID,
      });
    }
  );
});
