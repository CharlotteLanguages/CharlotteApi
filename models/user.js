// Modelo de usuario para interactuar con la base de datos
const pool = require('../dbConnection');

function getUserByUsername(userName, callback) {
  const query = 'SELECT * FROM PERSON WHERE userName = ?';
  pool.query(query, [userName], callback);
}

module.exports = { getUserByUsername };
