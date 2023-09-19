const mysql = require('mysql2');

/*var conn = mysql.createPool({
    host: 'containers-us-west-153.railway.app',
    port: 5905,
    user: 'root',
    password: '4UuCsu5O6YBY7ZUlSXLr',
    database: 'railway',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});*/

var conn = mysql.createConnection({
  host: 'containers-us-west-153.railway.app',
  port: 5905,
  user: 'root',
  password: '4UuCsu5O6YBY7ZUlSXLr',
  database: 'railway'
});

conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});

//module.exports = conn.promise;
module.exports = conn;


