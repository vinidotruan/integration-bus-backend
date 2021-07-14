const express = require("express");
const router = express.Router();
const mysql = require("../src/mysql").connection;
const mysqlPromise = mysql.promise();

const insertSQL = "INSERT INTO busLines (codigo, id, nome) VALUES (?,?,?)";

router.get("/", async (req, res, next) => {
  const [rows, fields] = await mysqlPromise.query("SELECT * FROM busLines");

  res.status(200).send({
    response: rows,
  });
});

router.get("/name", async (req, res) => {
  const name = req.query.name;

  const [rows, fields] = await mysqlPromise.query(
    `SELECT * FROM busLines WHERE nome LIKE '%${name}%'`
  );

  res.status(200).send({
    response: rows,
  });
});

router.post("/", async (req, res) => {
  const data = req.body;

  const response = mysql.query(
    insertSQL,
    [data.codigo, data.id, data.nome],
    (error, result, fields) => {
      if (error) {
        if (error.code == "ER_DUP_ENTRY") {
        }
        res.status(500).send({
          response: error,
        });
      }
      res.status(200).send({ response: response.rows });
    }
  );
});

module.exports = router;
