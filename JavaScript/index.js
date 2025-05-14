const cors = require('cors');  // Agregar la importación de cors
const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql2'); // Usa 'pg' si prefieres PostgreSQL

// Configura la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'neurocrib',
});

// Middleware para el análisis del cuerpo de solicitudes en formato JSON
app.use(express.json());

// Habilitar CORS para manejar correctamente solicitudes OPTIONS
const corsOptions = {
  origin: 'http://127.0.0.1:5500',  // Permitir solicitudes solo de este origen
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Especificar los métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'],  // Asegurarse de que las cabeceras adecuadas están permitidas
};
app.use(cors(corsOptions));

// Ruta para obtener todos los usuarios
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
      res.status(500).json({ error: 'Error al obtener usuarios' });
    } else {
      res.json({ users: results });
    }
  });
});

// Resto de las rutas...

// Inicia el servidor
app.listen(port, () => {
  console.log(`El servidor está escuchando en el puerto ${port}`);
});
// Manejo de errores para la conexión a la base de datos