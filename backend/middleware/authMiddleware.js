const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Buscar el token en la cabecera Authorization con formato "Bearer token"
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'Acceso denegado, token no proporcionado' });
  }

  const token = authHeader.replace('Bearer ', '').trim();

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado, token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // El token debería tener al menos { id, role }
    next();
  } catch (err) {
    console.error('Error validando token:', err.message);
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

module.exports = authMiddleware;
