// Controladores para la autenticación
const bcrypt = require('bcrypt');
const { getUserByUsername } = require('../models/user');
const { generateToken } = require('../config/jwt');

async function login(req, res) {
  const { userName, password } = req.body;

  getUserByUsername(userName, (err, results) => {
    if (err) throw err;

    if (results.length === 0) {
      return res.status(401).json({ message: 'Credenciales inválidasa' });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, match) => {
      if (err) throw err;

      if (match) {
        const token = generateToken({ id: user.id, userName: user.userName });
        res.json({ token });
      } else {
        res.status(401).json({ message: 'Credenciales inválidas' });
      }
    });
  });
}

module.exports = { login };
