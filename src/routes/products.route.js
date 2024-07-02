import { Router } from 'express';
import { getInventario, login, register, addProduct, deleteProduct, updateProduct } from '../controllers/products.controllers.js';

const router = Router();

// Rutas para usuarios
export default router;


router.get('/inventario', getInventario)
router.post('/login', login);
router.post('/register', register);
router.post('/addProduct', addProduct);
router.delete('/deleteProduct/:id', deleteProduct);
router.post('/updateProduct', updateProduct);

