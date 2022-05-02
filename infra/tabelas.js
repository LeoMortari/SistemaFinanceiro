class Categoria {
  //construtor de tabela
  init(conexao) {
    console.log("Banco conectado, itau feito pra você!");
  }

  criarDespesa() {
    const sql =
      "CREATE TABLE Categoria" +
      "(id_pk int NOT NULL AUTO_INCREMENT," +
      "nome varchar(30) NOT NULL," +
      "descricao varchar(50) NOT NULL" +
      "PRIMARY KEY(id_pk))";
    this.conexao.query(sql);
    /*this.conexao.query(sql, erro => {
          if(erro){
              console.log(erro)
          }else{
              console.log('Tabela movimento criada com sucesso!')
          }

      })*/
  }

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
module.exports = new Categoria();

//IR em index.js e criar a conexão
//curl -d "id=1&valor=29.9&descricao=teste" http://localhost:3000/despesa
