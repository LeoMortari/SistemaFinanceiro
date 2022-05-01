const mysql = require("../../infra/connection");

module.exports = (app) => {
  app.post("/lancamento", (req, res) => {
    let { descricao, valor, data, tipo, carteira_fk, categoria_fk } = req.body;

    const SQL = `INSERT INTO lancamento (descricao, valor, data, tipo, carteira_fk, categoria_fk) VALUES ('${descricao}', ${valor}, '${data}', ${tipo}, ${carteira_fk}, ${categoria_fk})`;

    mysql.query(SQL, (err, result) => {
      if (err) return res.send("Não foi possivel adicionar um novo lançamento");

      if (result.message) {
        const { message } = result;

        return res.send(message);
      }
    });

    res.send("Lançamento adicionado");
  });
};
