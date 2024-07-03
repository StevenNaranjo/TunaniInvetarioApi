import pool from './database/connection.js';



async function createTables() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Crear tabla tipos_productos
        await client.query(`
            CREATE TABLE IF NOT EXISTS tipos_productos (
                id SERIAL PRIMARY KEY,
                tipo VARCHAR(50) NOT NULL UNIQUE
            );
        `);

        // Añadir columna tipo_id a la tabla productos
        await client.query(`
            ALTER TABLE productos 
            ADD COLUMN IF NOT EXISTS tipo_id INT REFERENCES tipos_productos(id);
        `);

        // Insertar tipos de productos
        await client.query(`
            INSERT INTO tipos_productos (tipo) 
            VALUES ('Insumos'), ('Verduras/Frutas'), ('Higiene')
            ON CONFLICT (tipo) DO NOTHING;
        `);

        await client.query('COMMIT');
        console.log('Tablas creadas y datos insertados correctamente.');
    } catch (e) {
        await client.query('ROLLBACK');
        console.error('Error al crear tablas e insertar datos:', e);
    } finally {
        client.release();
    }
}

createTables().then(() => pool.end());