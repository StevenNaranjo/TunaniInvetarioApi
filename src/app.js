// src/app.js
const express = require('express');
const pool = require('./db');

const app = express();
const port = process.env.PORT || 3000;

app.get('/inventory', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM productos');
        res.json(result.rows);
    } catch (error) {
        console.error('Error obteniendo los productos:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
