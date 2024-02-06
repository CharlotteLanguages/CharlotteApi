// Configuración del manejo de JWT
const jwt = require('jsonwebtoken');

const secretKey = 'tu_clave_secreta';

function generateToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

function verifyToken(token) {
  return jwt.verify(token, secretKey);
}

module.exports = { generateToken, verifyToken };
