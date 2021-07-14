const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3303,
  user: "root",
  password: "root",
  database: "busIntegration",
});

connection.on("error", (error) => {
  throw error;
});

exports.connection = connection;
