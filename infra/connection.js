const mysql = require("mysql");

//Conexão com o banco de dados;
// Altere o HOST, USER, PASSWORD, PORT e DATABASE conforme o seu banco de dados;

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
    database: "nodejs",
});

module.exports = connection;