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
    return true
  } else {
    return false
  }
};

//validando senha
const verificarsenha = (senha) => {
  let ver = /^(?=.*[@!#$%^&*()/\\]{1,})(?=.*[0-9]{1,})(?=.*[A-Z]{1,})[@!#$%^&*()/\\a-zA-Z0-9]{8,20}$/;
  if (ver.test(senha)) {
    return true
  }
  return false

}

module.exports = (app) => {
  app.get('/login', (req, res) => {
    res.send("voce está em login")
  })

  app.post("/login/adicionar", (req, res) => {
    let { email, senha } = req.body;

    //se o email ou senha forem invalidos, não serão guardados no banco de dados
    if(!verificaremail(email) || !verificarsenha(senha)){
     throw console.error("senha ou email inválido");
    }else{
    const SQL = `INSERT INTO login (email,senha) VALUES ('${email}','${senha}')`;
    mysql.query(SQL, (err, result) => {
      if (err) return res.send("Não foi possivel adicionar um novo lançamento");

      if (result.message) {
        const { message } = result;

        return res.send(message);
      }
    });
  }
    res.send("voce esta em login")
  });

  app.post("/login/listar", (_, res) => {
    const SQL = "SELECT * FROM login;";

    mysql.query(SQL, (err, result) => {
      if (err)
        return res.status(400).send("Não foi possivel buscar os login");

      //Caso não tenha nenhum lançamento
      if (result.length == 0) {
        return res.json({ message: "Não há nenhum login" });
      }

      const newResult = result.map((item) => {
        return { ...item };
      });

      //Retornar na response
      res.send(newResult);

      //verificar se o email e senha inseridos estão no banco de dados
      const verificar = (email,senha) => {
        let cont = 0;
        const texto = JSON.stringify(newResult)
        if (texto.match(email)) cont++;    
        if (texto.match(senha)) cont++;
        if(cont==2){
          return console.log('login efetuado com sucesso!')
        }
        return console.log('email ou senha inválido(s)')
      }
      verificar('kenzoawane@gmail.com','Lkasbr123@');
    });

  });

};


/*
curl -d "email=kenzoawane@gmail.com&senha=Lkasbr@123" http://localhost:3000/login
*/