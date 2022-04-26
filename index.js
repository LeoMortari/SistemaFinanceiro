const customExpress = require("./config/customExpress");
const app = customExpress();
const connection = require("./infra/connection");
const table = require("./infra/tabelas");
const port = 3000;

connection.connect((err) => {
  // Caso dê erro com a conexão com o banco
  if (err) {
    return console.log("error in database connection, error: " + err);
  }

  // retorno caso não tenha erro
  return app.listen(port, () => {
    console.log("Servidor ok!");
  });
});

app.get("/", (req, res) => {
  res.send("Path: root");
});
