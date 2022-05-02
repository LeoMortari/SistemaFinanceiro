class Categoria{
  //construtor de tabela
  init(conexao){
      console.log("Banco conectado, itau feito pra você!")
  }

  criarDespesa(){
      const sql = 'CREATE TABLE Categoria' + 
      '(id_pk int NOT NULL AUTO_INCREMENT,' + 
      'nome varchar(30) NOT NULL,' +
      'descricao varchar(50) NOT NULL' +
      'PRIMARY KEY(id_pk))'
      this.conexao.query(sql)
      /*this.conexao.query(sql, erro => {
          if(erro){
              console.log(erro)
          }else{
              console.log('Tabela movimento criada com sucesso!')
          }

      })*/

 
  }

}
module.exports = new Categoria

//IR em index.js e criar a conexão
//curl -d "id=1&valor=29.9&descricao=teste" http://localhost:3000/despesa
