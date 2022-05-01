const express = require("express");
const consign = require("consign");
const bodyParser = require("body-parser");

// configuração geral da aplicação...não mexer aqui

module.exports = () => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  consign().include("controller").into(app);

  return app;
};
