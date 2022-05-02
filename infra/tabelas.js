class Tabelas {
  init(connection) {
    console.log("Connected stable");
    this.connection=connection
    this.criaLogin
  }

  // Classe de criação de tabelas para teste, não mexer por enquanto;

  criaLogin() {
    const sql =
      "create table login(email varchar(100),id_pk int AUTO_INCREMENT PRIMARY KEY,senha varchar(50));";
    this.connection.query(sql);
    this.conexao.query(sql, erro => {
      if (erro) {
          console.log(erro)
      } else {
          console.log('Tabela criada com sucesso')
      }
    });
  }
}

module.exports = new Tabelas;
