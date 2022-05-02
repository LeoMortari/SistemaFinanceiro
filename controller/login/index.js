const mysql = require("../../infra/connection");

module.exports = (app) => {
  app.get('/login', (req,res) => {
    res.send("voce está em login")
  })

  app.post("/login", (req, res) => {
    let { email, id_pk, senha } = req.body;

    const SQL = `INSERT INTO login (email,id_pk,senha) VALUES ('${email}', ${id_pk}, '${senha}')`;

    mysql.query(SQL, (err, result) => {
      if (err) return res.send("Não foi possivel adicionar um novo lançamento");

      if (result.message) {
        const { message } = result;

        return res.send(message);
      }
    });

    //testando validação
    const Selecionar = `SELECT * FROM login`;
    mysql.query(Selecionar, (err, result) => {
      if (err) return res.send("Não foi possivel adicionar um novo lançamento");

      //validando email
      if (email.match(/@/)) {
        if (email.match(/\./)) {
          console.log("email valido")
        } else {
          console.log("email inválido")
        }
      }

      //validando senha
      if(senha.length>7){
        console.log("senha válida")
        
      }else{
        console.log("senha inválida")
      }
    }
    );
    console.log(req.body);
    res.send("login adicionado");
  });
};