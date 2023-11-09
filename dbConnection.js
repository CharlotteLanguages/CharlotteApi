const mysql = require('mysql2');
const axios = require('axios');

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

module.exports = conn;

setInterval(function() {
  axios.get('/ping')
    .then(function(response) {
      // Procesa la respuesta si es necesario
    })
    .catch(function(error) {
      console.error('Error en la solicitud de ping:', error);
    });
}, 300000); // Envía una solicitud cada 5 minutos (300,000 milisegundos)