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
