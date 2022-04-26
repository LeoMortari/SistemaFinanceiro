module.exports = (app) => {
  
 // Começo de um dos endpoints
  app.get("/despesa", (req, res) => {
    // ... Logica dentro do endpoint
    //req = requisição
    //res = response

    res.send("despesa"); // resposta da API para o front;
  });
// final do endpoint
};
