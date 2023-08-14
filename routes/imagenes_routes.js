const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    callback(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const db  = require('../dbConnection');

app.post('/imageness', upload.single('image'), (req, res) => {
  const { filename, path } = req.file;

  const sql = 'INSERT INTO imagenes (name, path) VALUES (?, ?)';
  db.query(sql, [filename, path], (err, result) => {
    if (err) throw err;
    res.send('Image uploaded successfully.');
  });
});

