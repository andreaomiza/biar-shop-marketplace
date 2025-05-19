const express = require('express');
const router = express.Router();
const multer = require('multer');
const { authMiddleware } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const ServiceRequest = require('../models/ServiceRequest');
const path = require('path');

router.post('/request', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    const { nombre, email, tipoServicio, detalles } = req.body;
    if (!nombre || !email || !tipoServicio) {
      return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    const newRequest = new ServiceRequest({
      nombre,
      email,
      tipoServicio,
      detalles,
      user: req.user.id,
      estado: 'pendiente',
      archivoNombre: req.file ? req.file.originalname : null,
      archivoRuta: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await newRequest.save();

    res.status(201).json({ message: 'Solicitud recibida', request: newRequest });
  } catch (error) {
    console.error('Error al solicitar servicio:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;
