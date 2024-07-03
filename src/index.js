import app from './app.js'
//Comprobrar conexion con getConnection
import {getConnection} from './database/connection.js'
import pool from './database/connection.js';
getConnection()

app.get('/tiposProductos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tipos_productos');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener los tipos de productos' });
    }
});

app.listen(1434)