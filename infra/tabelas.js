class Tabelas {
  init(connection) {
    console.log("Connected stable");
  }

  // Classe de criação de tabelas para teste, não mexer por enquanto;

  criaDespesa() {
    const sql =
      "CREATE TABLE despesa (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, valor DOUBLE NOT NULL, descricao VARCHAR(150) NOT NULL)";
    this.connection.query(sql);
  }
  /*
  criaCarteira() {
    const sql = 'CREATE TABLE carteira' +
      '(id_pk int NOT NULL,' +
      'descricao varchar(100),' +
      'saldo double NOT NULL,' +
      'limite double NOT NULL,' +
      'nome varchar(100) NOT NULL),' +
      'FOREIGN KEY (id_pk) REFERENCES login (id_pk)'
    this.connection.query(sql);
  }
  //curl -d "descricao=&saldo=4000&limite=5000&nome=lucas" http://localhost:3000/carteira
  */
}

module.exports = new Tabelas;
