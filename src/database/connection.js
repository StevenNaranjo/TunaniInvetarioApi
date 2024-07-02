import Pool  from 'pg';
import dotenv from 'dotenv'; 
dotenv.config()// Carga las variables del archivo .env

//conectarse a la db de postgreSQL
// Un comentario de prueba

const pool = new Pool.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});


pool.on('connect', () => {
    console.log('Conectado a la base de datos');
});

pool.on('error', (err) => {
    console.error('Error en la conexión de la base de datos:', err);
});

export const getConnection = async () => {
    try {
        const client = await pool.connect();
        console.log('Conexión exitosa');
        client.release();
    } catch (err) {
        console.error('Error en la conexión de la base de datos:', err);
    }
}

//saber en cual puerto esta corriendo el server
export const PORT = process.env.PORT || 1434;

//exportar la conexion
export default pool;



