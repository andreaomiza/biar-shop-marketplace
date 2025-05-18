const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, category, fileUrl, imageUrl, isPublic } = req.body;

    if (!title || !price || !category || !fileUrl) {
      return res.status(400).json({ message: 'Título, precio, categoría y archivo son obligatorios' });
    }

    const newProduct = new Product({
      title,
      description,
      price,
      category,
      fileUrl,
      imageUrl,
      isPublic,
      seller: req.user.id, // ← Se asigna automáticamente el usuario autenticado
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error("❌ Error al crear producto:", err.message);
    res.status(500).json({ message: 'Error al crear producto' });
  }
};


exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('seller', 'email username');
    res.json(products);
  } catch (err) {
    console.error("❌ Error al obtener los productos:", err.message);
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('seller', 'email username');
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

    res.json(product);
  } catch (err) {
    console.error("❌ Error al obtener producto por ID:", err.message);
    res.status(500).json({ message: 'Error al obtener el producto' });
  }
};



