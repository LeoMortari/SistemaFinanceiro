module.exports=(app)=>{
    app.get('/carteira',(req,res)=>
    res.send("voce esta em carteira"))
    app.post('/carteira',(req,res)=>{
        console.log(req.body);
    res.send("voce esta via post")
    })
    }