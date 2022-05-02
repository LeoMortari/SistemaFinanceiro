const mysql = require("../../infra/connection");

module.exports = (app) => {
  app.post("/carteira/adicionar", (req, res) => {
    const { body } = req;
    const { descricao, saldo, limite, nome } = body;

    const selectSQL = `SELECT nome FROM carteira WHERE nome='${nome}'`;
    const insertSQL = `INSERT INTO carteira (descricao, saldo, limite, nome) VALUES ('${descricao}', ${saldo}, ${limite}, '${nome}')`;

    mysql.query(selectSQL, (err, result) => {
      let errors = [];

      if (err)
        errors.push({
          message: "Não foi possível buscar carteiras",
        });

      if (result.length > 0) {
        errors.push({message: "Carteira já existente" });
      } else {
        mysql.query(insertSQL, (err) => {
          if (err)
            errors.push({
              message: "Não foi possível adicionar carteira",
            });
        });
      }
      const isErrorExists = errors.length > 0;
      res
        .status(isErrorExists ? 400 : 200)
        .send(isErrorExists ? errors : "Carteira adicionada com sucesso");
    });
  });
};
