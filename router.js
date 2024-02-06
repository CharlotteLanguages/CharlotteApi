//const express = require('express');
//const router = express.Router();
//const db  = require('./dbConnection');
//const { signupValidation, loginValidation } = require('./validation');
//const { validationResult } = require('express-validator');
//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');

/*router.post('/login', loginValidation, (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    'SELECT email, password FROM PERSON WHERE email = ?',
    [email],
    (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err
        });
      }

      if (!result.length) {
        return res.status(401).send({
          msg: 'Email is incorrect!'
        });
      }

      // Verificar la contraseña utilizando bcrypt
      bcrypt.compare(password, result[0]['password'], (bErr, bResult) => {
        if (bErr) {
          throw bErr;
          return res.status(401).send({
            msg: 'Email or password is incorrect!'
          });
        }

        if (bResult === true) {
          const token = jwt.sign(
            { idPerson: result[0].idPerson },
            'the-super-strong-secret',
            { expiresIn: '1h' }
          );

          return res.status(200).send({
            msg: 'Logged in!',
            token,
            user: result[0]
          });
        } else {
          return res.status(401).send({
            msg: 'Email or password is incorrect!'
          });
        }
      });
    }
  );
});
 
module.exports = router;*/


// Rutas relacionadas con la autenticación
const express = require('express');
const { login } = require('../CharlotteApi/controllers/authController');
const authenticateToken = require('../CharlotteApi/middlewares/authMiddleware');

const router = express.Router();

// Ruta para iniciar sesión
router.post('/login', login);

// Ruta protegida que requiere un token válido
router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Ruta protegida' });
});

module.exports = router;