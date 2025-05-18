const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products - Obtener todos los productos públicos
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({ isPublic: true }).populate('seller', 'username email');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener productos', error: err.message });
  }
});

// POST /api/products - Crear un nuevo producto
router.post('/', async (req, res) => {
  try {
    const { title, description, price, category, fileUrl, imageUrl, seller } = req.body;

    if (!title || !price || !category || !fileUrl || !seller) {
      return res.status(400).json({ message: 'Título, precio, categoría, archivo y vendedor son obligatorios' });
    }

    const newProduct = new Product({
      title,
      description,
      price,
      category,
      fileUrl,
      imageUrl,
      seller,
    });

    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear producto', error: err.message });
  }
});

module.exports = router;


