// Configurações e Importações
const express = require('express');
const app = express();
// SERVIRDOR NATIVO DO NODE 
const http = require('http').createServer(app);
const io =  require('socket.io')(http);

// Configuraçõs da view
app.set("view engine", "ejs");

app.get('/pag', (req, res) => {
    res.render("index");
})

// Abrindo evento de conexão, sempre será chamado quando cliente entrr na aplicação 
io.on("connection", (socket) => {

    socket.on('disconnect',() => {
        console.log(`O usuário ${socket.id} desconectou`);
    })

    // Pegando a mensagem do Front-end
    socket.on("mensagem", (data) => {
        socket.emit("mensagem", data);
      
    })
})


// Craindo server
http.listen(5003, (req, res, err) => {
    if(err) console.log("Houve um erro");
    else console.log("Aplicação Rodando com sucesso");
})