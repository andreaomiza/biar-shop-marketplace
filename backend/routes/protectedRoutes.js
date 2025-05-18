const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken, (req, res) => {
  res.json({
    message: 'Has accedido a una ruta protegida',
    user: req.user, // muestra el id y role decodificado del token
  });
});

module.exports = router;
