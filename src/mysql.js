const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3303,
  user: "root",
  password: "root",
  database: "busIntegration",
});

exports.connection = connection;
