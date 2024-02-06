// Middleware para verificar el token JWT
/*const jwt = require('../config/jwt');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt')

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Acceso denegado' });

  try {
    const decoded = jwt.verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Token inválido' });
  }
}

module.exports = authenticateToken;

*/

// /middlewares/authMiddleware.js
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const db = require('../dbConnection');

const authMiddleware = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(401).json({ error: 'Credenciales incompletas' });
  }

  try {

    // Consulta para obtener el usuario por nombre de usuario
    const [rows] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const user = rows[0];

    // Verificar la contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Adjuntar el usuario autenticado a la solicitud
    req.user = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    // Continuar con la ejecución de la siguiente middleware o ruta
    next();
  } catch (error) {
    console.error('Error de autenticación:', error);
    return res.status(500).json({ error: 'Error de autenticación' });
  }
};

module.exports = authMiddleware;
