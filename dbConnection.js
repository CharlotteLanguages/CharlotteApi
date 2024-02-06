const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'roundhouse.proxy.rlwy.net',
  port: 25195,
  user: 'root',
  password: 'Gda1Ffh-3DD41AEdc2E54CBCD5g-GG21',
  database: 'railway'
});

// Función para realizar una consulta de ping
function pingDatabase() {
  connection.query('SELECT 1', (error, results) => {
    if (error) {
      // Maneja el error, por ejemplo, reconectándote a la base de datos
      console.error('Error al realizar ping a la base de datos:', error);
    } else {
      // La consulta de ping se realizó con éxito
      console.log('Ping exitoso');
    }
  });
}

// Establece un temporizador para realizar el ping cada 5 minutos (ajusta el tiempo según tus necesidades)
const pingInterval = setInterval(pingDatabase, 300000); // 300000 ms = 5 minutos


// Manejo de errores y desconexión
connection.connect(function(err) {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});


// Si necesitas hacer alguna tarea de limpieza al cerrar la aplicación, puedes escuchar el evento 'exit'
process.on('exit', () => {
  clearInterval(pingInterval); // Detiene el temporizador al salir de la aplicación
  connection.end(); // Cierra la conexión a la base de datos
});

pingDatabase();

module.exports = connection;