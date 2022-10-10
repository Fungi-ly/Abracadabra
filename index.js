const express = require("express");
const fs = require('fs'); 
const app = express();
const port = 3000;

app.use(express.static("./public/assets"));


let participantesJSON = JSON.parse(fs.readFileSync("public/assets/participantes.json", "utf8"));

let nombreUser = "";


app.get('/abracadabra/juego', (req, res) => {
    res.send('<div align="center"><img src="/img/who.jpeg" alt="¿Quién eres?" /><br><b><h2>¿QUIÉN ERES?</h2></b></div></div>')
});

app.use('/abracadabra/juego/:usuario', (req, res, next) => {
    const nombre = req.params.usuario;
    nombreUser = nombre;
    participantesJSON.usuarios.includes(nombre) ? next() : res.status(404).send(`<div align="center"><img src="/img/who.jpeg" alt="Usuario Desconocido." /><br><b><h2>${nombre}, no es usuario.</b></h2></div>`);
});

app.get("/abracadabra/juego/:usuario", (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
});


app.get("/abracadabra/usuarios", (req, res) => {
    res.send(participantesJSON);
})


app.get("/abracadabra/conejo/:numsombrero", (req, res) => {
    const n = Math.floor(Math.random() * (4)) + 1;
    console.log('n:', n);
    const numero = req.params.numsombrero;
    console.log('numeros:', numero);
    numero == n
        ? res.redirect("/abracadabra/voldemort")
        : res.redirect("/abracadabra/ganaste");
});

app.get("/abracadabra/ganaste", (req,res) => {
    res.send(`<div align="center"><img src="/img/voldemort.jpg" alt="Triunfaste!!" /><br><b><h2>${nombreUser}, has caido al lado obscuro.</h2></b></div>`);
});

app.get("/abracadabra/voldemort", (req,res) => {
    res.send(`<div align="center"><img src="/img/conejito.jpg" alt="Perdiste!!" /><br><b><h2>${nombreUser}, GANASTE UN CONEJITO DE LA SUERTE!!!</h2></b></div>`);
});


app.all("*", (req, res) => {
    res.status(404).send('RECURSO NO ENCONTRADO.')
})

app.listen(port, () => console.log(`Iniciando puerto en: ${port}`));