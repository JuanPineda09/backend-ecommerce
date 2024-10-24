const express = require('express');
const cors = require("cors");
const connection = require("./config/db.JS");

require('dotenv').config()

const app = express();

app.use(cors());
app.use(express.json())

connection.connect((err) => {
    if (err) {
      console.error('Error conectando a la base de datos: ' + err.stack);
      return;
    }
    console.log('Conectado a la base de datos como ID ' + connection.threadId);
  });

app.get('/', (req, res) => {
    res.send('¡Conexión a la base de datos exitosa!');
  });

app.listen(process.env.SERVER_PORT, () =>{
    console.log("El servidor esta corriendo");
});
