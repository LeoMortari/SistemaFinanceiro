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
}

module.exports = new Tabelas;
