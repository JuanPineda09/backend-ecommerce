const mysql = require('mysql2');

require('dotenv').config({ path: './variables.env' });

 
// Configura la conexión a la base de datos
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT
});
 
// Conecta a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos: ' + err.stack);
    return;
  }
  console.log('Conectado a la base de datos como ID ' + connection.threadId);
});
 

module.exports = connection;
// // Middleware para analizar JSON
// app.use(express.json());
 
// Rutas de ejemplo
// app.get('/usuarios', (req, res) => {
//   connection.query('SELECT * FROM usuarios', (err, results) => {
//     if (err) {
//       return res.status(500).send(err);
//     }
//     res.json(results);
//   });
// });
 
// app.post('/usuarios', (req, res) => {
//   const { nombre, email } = req.body;
//   connection.query('INSERT INTO usuarios (nombre, email) VALUES (?, ?)', [nombre, email], (err, results) => {
//     if (err) {
//       return res.status(500).send(err);
//     }
//     res.status(201).json({ id: results.insertId, nombre, email });
//   });
// });
 
