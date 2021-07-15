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
  const selectSQL = `SELECT * FROM busLines WHERE id = '${data.id}';`;

  const [rows, fields] = await mysqlPromise.query(selectSQL);
  if (rows) {
    const oldData = rows[0];
    if (Object.entries(oldData).toString() != Object.entries(data).toString()) {
      const updateResult = mysql.query(
        `UPDATE busLines SET codigo = ?, nome = ? WHERE id = ?`,
        [data.codigo, data.nome, data.id],
        (err, result) => {
          if (err) {
            res.status(500).send({
              response: { message: "Error on update" },
            });
            return;
          }
          res.status(200).send({
            response: { message: "Updated" },
          });
          return;
        }
      );
      return;
    }
  }
  mysql.query(
    insertSQL,
    [data.codigo, data.id, data.nome],
    (error, result, fields) => {
      if (error) {
        if (error.code == "ER_DUP_ENTRY") {
          res.status(500).send({
            response: error,
          });
          return;
        }
        return;
      }
      res.status(200).send({ response: result });
      return;
    }
  );
});

router.delete("/:id", async (req, res) => {
  const data = req.params.id;

  mysql.query(`DELETE FROM busLines WHERE id = ${data}`, (err, result) => {
    if (err) {
      res.status(500).send({
        response: err,
      });
    }
    res.status(200).send({
      response: {
        message: "Deleted",
      },
    });
  });
});

module.exports = router;
