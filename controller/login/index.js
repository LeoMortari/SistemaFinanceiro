const mysql = require("../../infra/connection");

//validando email
const verificaremail = (email) => {
  let cont = 0;
  if (email.match(/@/)) {
    if (email.match(/\./)) {
      cont++
    }
  }
  if (cont == 1) {
    console.log("Email válido")
  } else {
    console.log("Email inválido")
  }
};

//validando senha
const verificarsenha = (senha) => {
  let ver = /^(?=.*[@!#$%^&*()/\\]{1,})(?=.*[0-9]{1,})(?=.*[A-Z]{1,})[@!#$%^&*()/\\a-zA-Z0-9]{8,20}$/;
  if (ver.test(senha)) {
    return console.log("senha válida")
  }
  return console.log("senha inválida")

}

module.exports = (app) => {
  app.get('/login', (req, res) => {
    res.send("voce está em login")
  })

  app.post("/login", (req, res) => {
    let { email, id_pk, senha } = req.body;

    const SQL = `INSERT INTO login (email,senha) VALUES ('${email}','${senha}')`;
    verificaremail(email);

    verificarsenha(senha);
    mysql.query(SQL, (err, result) => {
      if (err) return res.send("Não foi possivel adicionar um novo lançamento");

      if (result.message) {
        const { message } = result;

        return res.send(message);
      }
    });
    res.send("voce esta em login")
  });

  app.post("/login/listar", (_, res) => {
    const SQL = "SELECT * FROM login  ";

    mysql.query(SQL, (err, result) => {
      if (err)
        return res.status(400).send("Não foi possivel buscar os lançamentos");

      //Caso não tenha nenhum lançamento
      if (result.length == 0) {
        return res.json({ message: "Não há nenhum login" });
      }

      //Inverter a data que volta do DB
      const newResult = result.map((item) => {


        return { ...item };
      });

      //Retornar na response
      return res.send(newResult);
    });
  });

};


/*
curl -d "email=kenzoawane@gmail.com&senha=Lkasbr@123" http://localhost:3000/login
*/