const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/seller/dashboard - Datos del vendedor
router.get('/dashboard', authMiddleware, (req, res) => {
  if (req.user.role !== 'vendedor') {
    return res.status(403).json({ message: 'Solo accesible para vendedores' });
  }

  // Datos de ejemplo, deberías reemplazar por estadísticas reales del vendedor
  res.json({
    ventasTotales: 120,
    serviciosSolicitados: 35,
    ingresos: 5400,
  });
});

module.exports = router;
