const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('./db');

const router = express.Router();
const secretKey = 'tu_llave_secreta';

// Ruta de inicio de sesión
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const userQuery = await pool.query('SELECT * FROM usuarios WHERE usuario = $1', [username]);
    const user = userQuery.rows[0];

    if (user && bcrypt.compareSync(password, user.contrasena)) {
      const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
      return res.json({ token });
    }
    
    res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Ruta para obtener el inventario
router.get('/inventory', async (req, res) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado' });
  }

  try {
    jwt.verify(token, secretKey);
    const result = await pool.query('SELECT * FROM productos');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Ruta para actualizar el inventario
router.post('/inventory', async (req, res) => {
  const token = req.headers['authorization'];
  const { nombre, cantidad } = req.body;

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado' });
  }

  try {
    jwt.verify(token, secretKey);
    await pool.query(
      'INSERT INTO productos (nombre, cantidad) VALUES ($1, $2) ON CONFLICT (nombre) DO UPDATE SET cantidad = $2',
      [nombre, cantidad]
    );
    res.json({ message: 'Producto actualizado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

module.exports = router;
