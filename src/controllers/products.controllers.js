import { getConnection } from '../database/connection.js'

import jwt from 'jsonwebtoken'

const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('./db');  // Asegúrate de que './db' es la configuración correcta para tu base de datos
const router = express.Router();

module.exports = router;
