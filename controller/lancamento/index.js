const mysql = require("../../infra/connection");

//Função que inverte a data do DB
const fixDate = (data) => {
  const date = new Date(data);

  //Gatters de data
  const day = date.getDate();
  const year = date.getFullYear();
  let mounth = date.getMonth() + 1;

  //Caso o mês seja menor que 10, adiciona o '0' antes do número
  if (mounth < 10) {
    mounth = `0${mounth}`;
  }

  //Retorna a string formatada
  return `${day}/${mounth}/${year}`;
};

//Função que verifica se algum item não está vazio;
const verifyItems = (req) => {
  let error;

  const objArr = Object.values(req);

  //Procura pelo primeiro campo que esteja vazio
  objArr.find((item) => {
    if (!item) {
      error = "Campo Obrigatório";
    }
  });

  return error ? error : 0;
};

//Função que valida datas
const isValidDate = (data) => {
  const date = data.split("-");

  //Array que servirá para validar se a data estará totalmente errada
  let totallyErrorDate = [];

  //Dia, mês e ano em constantes;
  const year = date[0];
  const month = date[1];
  const day = date[2];

  //Array de erros
  let objError = [];

  //Validações de datas;
  if (!year || !month || !day) {
    objError.push({ field: "date", error: "Insira uma data válida" });
  } else {
    if (year.length > 4) {
      objError.push({ field: "year", error: "Insira um ano válido" });
    }
    if (month > 12 || month < 0) {
      objError.push({ field: "month", error: "Insira um mês válido" });
    }
    if (day > 31) {
      objError.push({ field: "day", error: "Insira um dia válido" });
    }
  }

  //Caso de 3, significa que o dia, o mes e o ano estão errados
  if (objError.length == 3) {
    totallyErrorDate.push({ field: "date", error: "Insira uma data válida" });
  }

  //Retorna o array de objetos com os erros
  return totallyErrorDate.length > 0 ? totallyErrorDate : objError;
};

module.exports = (app) => {
  //Adicionar um novo lançamento
  app.post("/lancamento/adicionar", (req, res) => {
    const { body } = req;

    //Verifica se tem algum campo em branco;
    if (verifyItems(body)) {
      return res.status(400).send(verifyItems(body));
    }

    //Retira todos os valores vindo da requisição
    const { descricao, valor, tipo, carteira_fk, categoria_fk } = body;

    //Retira a data, para um tratamento especial;
    let {
      body: { data },
    } = req;

    const getErrorDate = isValidDate(data);

    //Caso tenha uma data inválida
    if (getErrorDate.length > 0) {
      return res.send(getErrorDate);
    }

    //SQL
    const SQL = `INSERT INTO lancamento (descricao, valor, tipo, carteira_fk, categoria_fk, data) VALUES ('${descricao}', ${valor}, ${tipo}, ${carteira_fk}, ${categoria_fk}, '${data}')`;

    //Função que adiciona um novo lançamento
    mysql.query(SQL, (err, result) => {
      if (err)
        return res
          .status(400)
          .send("Não foi possivel adicionar um novo lançamento");

      //Caso venha uma mensagem do banco de dados
      if (result.message) {
        const { message } = result;

        return res.status(400).send(message);
      }
    });

    return res.status(200).send("Lançamento adicionado");
  });

  //Listar todos os lançamentos
  app.post("/lancamento/listar", (_, res) => {
    const SQL = "SELECT * FROM lancamento";

    mysql.query(SQL, (err, result) => {
      if (err)
        return res.status(400).send("Não foi possivel buscar os lançamentos");

      //Caso não tenha nenhum lançamento
      if (result.length == 0) {
        return res.json({ message: "Não há nenhum lançamento" });
      }

      //Inverter a data que volta do DB
      const newResult = result.map((item) => {
        let { data } = item;

        let newDate = fixDate(data);

        return { ...item, data: newDate };
      });

      //Retornar na response
      return res.send(newResult);
    });
  });
};
