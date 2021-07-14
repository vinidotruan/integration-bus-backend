const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.get("/", async (req, res, next) => {
  const response = await fetch(
    "http://www.poatransporte.com.br/php/facades/process.php?a=nc&p=%&t=o"
  );
  const responseJson = await response.json();

  res.status(200).send({
    response: responseJson,
  });
});

module.exports = router;
