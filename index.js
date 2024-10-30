const express = require('express');
const cors = require("cors");
const connection = require("./config/db.JS");
const sequelize = require('./models/configSequelize');
// const Roles = require('./models/roles');
const User = require('./models/user');
const usuarioRoutes = require("./routes/usersRoutes");
const rolesRoutes = require("./routes/rolesRoutes")
require('dotenv').config({ path: './variables.env' });

const app = express();

app.use(cors());
app.use(express.json())

//Habilitar express.json
app.use(express.json({extended: true}));

app.use("/api",usuarioRoutes);
app.use("/api",rolesRoutes);

app.listen(process.env.SERVER_PORT, () =>{
    console.log("El servidor esta corriendo");
});


// Probar la conexión Sequelize
async function testConnection() {
  try {
      await sequelize.authenticate();
      console.log('Conexión de sequelize exitosa');
      
      // Sincronizar modelos
      await sequelize.sync();
      console.log('Modelos sincronizados correctamente.');
  } catch (error) {
      console.error('Error al conectar con la base de datos:', error);
  }
}

testConnection();
