import jwt from 'jsonwebtoken'

import express from 'express';
import bcrypt from 'bcryptjs';
import pool from '../database/connection.js';  // Asegúrate de que './db' es la configuración correcta para tu base de datos
const router = express.Router();

//logica para obtener el inventario
export const getInventario = async (req, res) => {
    try {
        const products = await pool.query(
            'SELECT p.*, t.tipo FROM productos p JOIN tipos_productos t ON p.tipo_id = t.id'
        );
        res.json(products.rows);
    } catch (err) {
        console.error(err.message);
    }
};
// Tabla usuarios
// id integer
// usuario text
// contraseña text
//logica para iniciar sesion

export const login = async (req, res) => {
    try {
        const { usuario, contraseña } = req.body;
        const user = await pool.query('SELECT * FROM usuarios WHERE usuario = $1', [usuario]);
        if (user.rows.length === 0) {
            return res.status(401).json('Usuario o contraseña incorrectos');
        }
        const validPassword = await bcrypt.compare(contraseña, user.rows[0].contraseña);
        if (!validPassword) {
            return res.status(401).json('Usuario o contraseña incorrectos');
        }
        const token = jwt.sign({ id: user.rows[0].id }, process.env.SECRET_KEY, {
            expiresIn: '1h'
        });
        res.json(token);
    } catch (err) {
        console.error(err.message);
    }
};

export const register = async (req, res) => {
    try {
        const { usuario, contraseña } = req.body;
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        const newUser = await pool.query('INSERT INTO usuarios (usuario, contraseña) VALUES ($1, $2) RETURNING *', [usuario, hashedPassword]);
        const token = jwt.sign({ id: newUser.rows[0].id }, process.env.SECRET_KEY, {
            expiresIn: '1h'
        });
        res.json(token);
    } catch (err) {
        console.error(err.message);
    }
};

export const addProduct = async (req, res) => {
    try {
        const { nombre, cantidad, tipo_id } = req.body;
        const newProduct = await pool.query(
            'INSERT INTO productos (nombre, cantidad, tipo_id) VALUES ($1, $2, $3) RETURNING *',
            [nombre, cantidad, tipo_id]
        );
        res.json(newProduct.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM productos WHERE id = $1', [id]);
        res.json('Producto eliminado');
    } catch (err) {
        console.error(err.message);
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, cantidad, tipo_id } = req.body;
        await pool.query(
            'UPDATE productos SET nombre = $1, cantidad = $2, tipo_id = $3 WHERE id = $4',
            [nombre, cantidad, tipo_id, id]
        );
        res.json('Producto actualizado');
    } catch (err) {
        console.error(err.message);
    }
};

export const getProductTypes = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tipos_productos');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener los tipos de productos' });
    }
}