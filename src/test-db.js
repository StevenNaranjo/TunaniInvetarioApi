const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres:jydTbUvYvOzymUVoltMaYqvbgafVrUIb@monorail.proxy.rlwy.net:28201/railway'
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error ejecutando la consulta:', err);
  } else {
    console.log('Hora actual en la base de datos:', res.rows[0]);
  }
  pool.end();
});