const mysql = require("../../infra/connection");

module.exports = (app) => {
    app.post("/categoria", (req, res) => {
        const {body} = req;
        
      const {nome, descricao} = req.body;
  
      const SQL = `SELECT INTO Categoria (nome, descricao,) VALUES (${nome}, '${descricao}')`;
  
      mysql.query(SQL, (err, result) => {
        if (err) return res.send("Não foi possivel adicionar uma nova Categoria");
  
        if (result.message) {
          const { message } = result;
  
          return res.send(message);
        }
      });
  
      res.send("Categoria adicionada");
    });
  };
  