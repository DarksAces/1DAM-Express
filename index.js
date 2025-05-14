//Requiere instalar: npm install mysql2
//Si es postgres: npm install pg
//Requiere crear un archivo package.json, que contendrÃƒÂ¡ la informaciÃƒÂ³n el proyecto y sus dependencias: npm init -y
//Requiere instalar: npm install express


const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql2'); //pg con postgres

// Configura la conexiÃƒÂ³n a la base de datos MySQL

const db = mysql.createConnection({
  host: 'localhost',
  user: 'tu_usuario',
  password: 'tu_contraseÃƒÂ±a',
  database: 'neurocrib',
});

// Middleware para el anÃƒÂ¡lisis del cuerpo de solicitudes en formato JSON
app.use(express.json());

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

// Ruta para obtener un usuario por su ID
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error al obtener el usuario:', err);
      res.status(500).json({ error: 'Error al obtener el usuario' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: 'Usuario no encontrado' });
      } else {
        res.json({ user: results[0] });
      }
    }
  });
});

// Ruta para crear un nuevo usuario
app.post('/api/users', (req, res) => {
  const newUser = req.body;
  db.query('INSERT INTO users (nombre, email) VALUES (?, ?)', [newUser.nombre, newUser.email], (err, results) => {
    if (err) {
      console.error('Error al crear el usuario:', err);
      res.status(500).json({ error: 'Error al crear el usuario' });
    } else {
      res.json({ message: 'Usuario creado con ÃƒÂ©xito', user: newUser });
    }
  });
});

// Ruta para actualizar un usuario por su ID
app.put('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  db.query('UPDATE users SET nombre = ?, email = ? WHERE id = ?', [updatedUser.nombre, updatedUser.email, userId], (err, results) => {
    if (err) {
      console.error('Error al actualizar el usuario:', err);
      res.status(500).json({ error: 'Error al actualizar el usuario' });
    } else {
      res.json({ message: 'Usuario actualizado con ÃƒÂ©xito', user: updatedUser });
    }
  });
});

// Ruta para eliminar un usuario por su ID
app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  db.query('DELETE FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error al eliminar el usuario:', err);
      res.status(500).json({ error: 'Error al eliminar el usuario' });
    } else {
      res.json({ message: 'Usuario eliminado con ÃƒÂ©xito' });
    }
  });
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`El servidor estÃƒÂ¡ escuchando en el puerto ${port}`);
});