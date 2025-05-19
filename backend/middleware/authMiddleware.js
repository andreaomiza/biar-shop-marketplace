const jwt = require('jsonwebtoken');

// Middleware para validar autenticación
const authMiddleware = (req, res, next) => {
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
    console.log('Decoded token payload:', decoded); // <-- aquí
    req.user = decoded; // { id, role, etc }
    next();
  } catch (err) {
    console.error('Error validando token:', err.message);
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

// Middleware para validar rol (recibe el rol requerido)
const roleMiddleware = (requiredRole) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'No autenticado' });
  }
  if (req.user.role !== requiredRole) {
    return res.status(403).json({ message: `Acceso no autorizado, se requiere rol ${requiredRole}` });
  }
  next();
};

module.exports = { authMiddleware, roleMiddleware };

