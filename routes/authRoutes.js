// Rutas relacionadas con la autenticación
const express = require('express');
const { login } = require('../controllers/authController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

// Ruta para iniciar sesión
router.post('/login', login);

// Ruta protegida que requiere un token válido
router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Ruta protegida' });
});

module.exports = router;
