/*const mysql = require('mysql2');

const connection = require('express-myconnection');

var conn = mysql.createConnection({
  host: 'containers-us-west-153.railway.app',
  port: 5905,
  user: 'root',
  password: '4UuCsu5O6YBY7ZUlSXLr',
  database: 'railway'
});

conn.connect(function(err) {
  if (err){
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Database is connected successfully !');
  } 
});

connection.on('err', function(err) {
  console.error('Error de base de datos: ', err.message);
  if(err.code === 'PROTOCOL_CONNECTION_LOST') {
    //Reconectar en caso de desconexión
    connection.connect();
  } else {
    throw err;
  }
});

module.exports = conn;
*/

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'containers-us-west-153.railway.app',
  port: 5905,
  user: 'root',
  password: '4UuCsu5O6YBY7ZUlSXLr',
  database: 'railway'
});

connection.connect(function(err) {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

connection.on('error', function(err) {
  console.error('Error de base de datos:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    // Reconectar en caso de desconexión
    connection.connect();
  } else {
    throw err;
  }
});
