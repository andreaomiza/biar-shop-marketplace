const express = require('express');
const router = express.Router();
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

// GET /api/seller/dashboard - Datos solo para vendedores
router.get('/dashboard', authMiddleware, roleMiddleware('vendedor'), (req, res) => {
  // Datos de ejemplo, reemplaza con datos reales
  res.json({
    ventasTotales: 120,
    serviciosSolicitados: 35,
    ingresos: 5400,
  });
});

module.exports = router;

