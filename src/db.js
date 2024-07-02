const { Pool } = require('pg');
require('dotenv').config(); // Carga las variables del archivo .env

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
    console.log('Conectado a la base de datos');
});

pool.on('error', (err) => {
    console.error('Error en la conexión de la base de datos:', err);
});

module.exports = pool;
