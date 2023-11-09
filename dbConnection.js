const mysql = require('mysql2');

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

setInterval(function() {
  $.ajax({
    url: "/ping", // La URL que manejará la solicitud de ping en tu servidor
    method: "GET",
    success: function(data) {
      // Procesa la respuesta si es necesario
    }
  });
}, 300000); // Envía una solicitud cada 5 minutos (300,000 milisegundos)

