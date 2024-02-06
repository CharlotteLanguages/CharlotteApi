const { db } = require('../dbConnection');

class DbService {
  getUserByEmail(email, callback) {
    db.query(
      'SELECT idPerson, email, role, permissions, password FROM PERSON WHERE email = ?',
      [email],
      (err, result) => {
        if (err) {
          return callback(err, null);
        }
        callback(null, result.length ? result[0] : null);
      }
    );
  }
}

module.exports = { DbService };
