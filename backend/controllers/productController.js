const Product = require('../models/Product');

const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, isPublic } = req.body;

    // Validar presencia de usuario autenticado
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    // Validar campos obligatorios
    if (!title || !price || !category) {
      return res.status(400).json({ message: 'Faltan campos obligatorios: título, precio o categoría' });
    }

    // Validar archivos
    if (!req.files || !req.files['file'] || !req.files['image']) {
      return res.status(400).json({ message: 'Faltan archivos requeridos: archivo principal o imagen' });
    }

    const file = req.files['file'][0];
    const image = req.files['image'][0];

    // Construir URLs relativas
    const fileUrl = `/uploads/${file.filename}`;
    const imageUrl = `/uploads/${image.filename}`;

    const product = new Product({
      title,
      description,
      price: parseFloat(price),
      category,
      fileUrl,
      imageUrl,
      isPublic: isPublic === 'true' || isPublic === true,
      seller: req.user._id,
    });

    await product.save();
    res.status(201).json(product);

  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ message: 'Error interno al crear producto', error: error.message });
  }
};

module.exports = { createProduct };


