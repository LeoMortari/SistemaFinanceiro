const mysql = require("../../infra/connection");

//validando email
const validaremail = (email) => {
  let cont = 0;
  if (email.length < 9) return false;
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
const validarsenha = (senha) => {
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
    if (!validaremail(email) || !validarsenha(senha)) {
      throw console.error("senha ou email inválido");
    } else {
      const SQL = `INSERT INTO login (email,senha) VALUES ('${email}','${senha}')`;
      mysql.query(SQL, (err, result) => {
        if (err) return res.send("Não foi possivel adicionar um novo lançamento");

        if (result.message) {
          const { message } = result;

          return res.send(message);
        }
      });
    }
    res.send("Login inserido com sucesso")
  });
  /* curl para inserir dados no BD
  curl -d "email=kenzoawane@gmail.com&senha=Lkasbr@123" http://localhost:3000/login/adicionar
  */

  app.post("/login", (req, res) => {
    let { email, senha } = req.body

    const SQL = `SELECT * FROM login where email='${email}' and senha='${senha}'`;
    mysql.query(SQL, (err, result) => {
      if (err)
        return console.log("erro no login " + err);

      //Caso não ache o email e senha informados
      if (result.length == 0) {
        return res.send("login não encontrado");
      }
      return res.send('logado com sucesso!')

      /* curl para verificar se o dados inseridos batem no banco de dados
      curl -d "email=kenzoawane@gmail.com&senha=Lkasbr@123" http://localhost:3000/login
      */

      // const newResult = result.map((item) => {
      //   return { ...item };
      // });

      // const verificar = (email,senha) => {
      //   let cont = 0;

      //   const texto = JSON.stringify(newResult)
      //   if (texto.match(email)) cont++;
      //   if(validaremail(email)) cont++;   
      //   if (texto.match(senha)) cont++;
      //   if(validarsenha(senha)) cont++;   

      //   if(cont==4){
      //     return res.send('login efetuado com sucesso!')
      //   }
      //   return res.send('email ou senha inválido(s)')
      // }

      // //verificar se o email e senha inseridos estão no banco de dados

      // verificar(email,senha);
    });

  });

};
