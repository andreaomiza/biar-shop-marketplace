const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware'); // multer configurado para subir archivos
const productController = require('../controllers/productController');

// GET /api/products - Obtener todos los productos públicos
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({ isPublic: true }).populate('seller', 'username email');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener productos', error: err.message });
  }
});

// POST /api/products - Crear un nuevo producto (solo vendedores autenticados)
router.post(
  '/',
  authMiddleware,
  roleMiddleware('vendedor'),
  upload.fields([
    { name: 'file', maxCount: 1 },
    { name: 'image', maxCount: 1 }
  ]),
  productController.createProduct
);

module.exports = router;

