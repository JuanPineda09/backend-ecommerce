const express = require('express');
const cors = require("cors");
const connection = require("./config/db.JS");
const sequelize = require('./models/configSequelize');
const User = require('./models/user');
const Roles = require('./models/roles');
const Categorias = require('./models/categorias');
const Productos = require('./models/productos');
const usuarioRoutes = require("./routes/usersRoutes");
const authRouters = require("./routes/authRoutes");
const rolesRoutes = require("./routes/rolesRoutes")
const categoriasRoutes = require("./routes/categoriasRoutes");
const productosRoutes = require("./routes/productosRoutes");
require('dotenv').config({ path: './variables.env' });
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,'uploads')))

//Habilitar express.json
app.use(express.json({extended: true}));

app.use("/api",usuarioRoutes);
app.use("/api",rolesRoutes);
app.use("/api/auth",authRouters);
app.use("/api/",categoriasRoutes);
app.use("/api",productosRoutes);

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
