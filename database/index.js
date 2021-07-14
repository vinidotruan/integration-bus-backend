const fetch = require("node-fetch");
const mysql = require("../src/mysql").connection;

const createBusLinesTable = async () => {
  const sql =
    "CREATE TABLE busIntegration.busLines (id VARCHAR(255) NOT NULL,codigo VARCHAR(255) NULL,nome VARCHAR(255) NULL,PRIMARY KEY (id));";

  mysql.query(sql, (err) => {
    if (err) {
      console.error("err", err);
    }
    console.log("Table created");
  });
};

const createItinerariesTable = async () => {
  const sql =
    "CREATE TABLE busIntegration.itineraries (idlinha VARCHAR(255) NOT NULL,nome VARCHAR(255) NULL,codigo VARCHAR(255) NULL,tineraries JSON NULL,PRIMARY KEY (idlinha));";

  mysql.query(sql, (err) => {
    if (err) {
      console.error("err", err);
    }
    console.log("Table created");
  });
};

const populateDB = async () => {
  const response = await fetch(
    "http://www.poatransporte.com.br/php/facades/process.php?a=nc&p=%&t=o"
  );
  const responseJson = await response.json();
  const sql = "INSERT INTO busLines (codigo, id, nome) VALUES (?,?,?)";

  responseJson.forEach((element) => {
    mysql.query(sql, [element.codigo, element.id, element.nome], (err) => {
      if (err) {
        throw err;
      }
      console.log("success");
    });
  });
  mysql.end();
};

const populateDBItineraries = async () => {
  const mysqlPromise = mysql.promise();

  const [rows, fields] = await mysqlPromise.query("SELECT * FROM busLines");
  const busLines = rows;

  busLines.map(async (busLine) => {
    setInterval(async () => {
      console.log("buscando novo itinerário");
      const url = `http://www.poatransporte.com.br/php/facades/process.php?a=il&p=${busLine.id}`;

      const responseFetch = await fetch(url);
      const itinerariesInfo = await responseFetch.json();

      const itineraries = (({ idLinha, nome, codigo, ...o }) => o)(
        itinerariesInfo
      );

      const sql =
        "INSERT INTO itineraries (idlinha, nome, codigo, itineraries) VALUES (?,?,?,?)";

      mysql.query(
        sql,
        [
          itinerariesInfo.id,
          itinerariesInfo.nome,
          itinerariesInfo.codigo,
          itineraries,
        ],
        (err) => {
          if (err) {
            throw err;
          }
          console.log("success");
        }
      );
    }, 1000);
  });
  return true;
};

createBusLinesTable();
createItinerariesTable();
populateDB();
populateDBItineraries();
