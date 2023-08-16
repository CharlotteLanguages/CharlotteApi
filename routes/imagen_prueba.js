/*
const express = require('express');
const multer = require('multer');
const mysql = require('mysql');

const db  = require('./dbConnection');

const app = express();


// Configuración de multer para la carga de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Ruta para subir imágenes
app.post('/upload', upload.single('image'), (req, res) => {
  const { title, description } = req.body;
  const imageUrl = req.file.path;

  const sql = 'INSERT INTO newimagenes (titulo, descripcion, url) VALUES (?, ?, ?)';
  db.query(sql, [title, description, imageUrl], (err, result) => {
    if (err) {
      console.error('Error al insertar en la base de datos:', err);
      res.status(500).json({ message: 'Error interno del servidor' });
    } else {
      res.json({ message: 'Imagen subida exitosamente' });
    }
  });
});
*/

const express = require('express');
const multer = require('multer');
const mysql = require('mysql');

const app = express();
const port = 3000; // Puerto en el que se ejecutará el servidor

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'usuario',
  password: 'contraseña',
  database: 'basedatos'
});

db.connect(err => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

// Configuración de multer para la carga de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Ruta para subir imágenes
app.post('/upload', upload.single('image'), (req, res) => {
  const { title, description } = req.body;
  const imageUrl = req.file.path;

  const sql = 'INSERT INTO imagenes (titulo, descripcion, url) VALUES (?, ?, ?)';
  db.query(sql, [title, description, imageUrl], (err, result) => {
    if (err) {
      console.error('Error al insertar en la base de datos:', err);
      res.status(500).json({ message: 'Error interno del servidor' });
    } else {
      res.json({ message: 'Imagen subida exitosamente' });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});





/*
const express = require('express');
const multer = require('multer');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'tu_usuario',
  password: 'tu_contraseña',
  database: 'nombre_de_tu_bd'
});

db.connect(err => {
  if (err) throw err;
  console.log('Conexión a la base de datos exitosa');
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No se ha proporcionado ninguna imagen.');
  }

  const imageUrl = req.file.path; // Ruta de la imagen en el sistema de archivos

  const sql = 'INSERT INTO imagenes (ruta) VALUES (?)';
  db.query(sql, [imageUrl], (err, result) => {
    if (err) throw err;
    console.log('Imagen subida y registrada en la base de datos.');
    res.send('Imagen subida y registrada en la base de datos.');
  });
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
*/