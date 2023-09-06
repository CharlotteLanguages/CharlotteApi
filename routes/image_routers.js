/*const express = require('express');
const multer = require('multer')({
  dest: 'public/files'
})
const routes = express.Router();
const fs = require('fs')
const path = require('path')

const imagesController = require("../controllers/imagesController");

routes.post(
  "/images/:tabla",
  imagesController.upload,
  imagesController.uploadFile
);

routes.get('/', (req, res) =>{
  req.getConnection((err, conn)=>{
      if(err) return res.send(err)
      conn.query('SELECT * FROM newimagenes', (err, rows)=>{
                  if(err) return res.send(err)
                  res.json(rows)
              })
  })
})

module.exports =routes;*/


const express = require('express');
const routes = express.Router();
const db = require('../dbConnection');

const imagesController = require("../controllers/imagesController");

routes.post(
  "/images/:tabla",
  imagesController.upload,
  imagesController.uploadFile
);

routes.get('/images', (req, res) =>{
  const sql = 'SELECT nombre, tipo, imagen as imagen_url FROM imagenesPrueba'
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al consultar la base de datos:', err);
      res.status(500).json({ message: 'Error interno del servidor' });
    } else {
      // Modifica el resultado para incluir la URL de la imagen
      const data = results.map(result => {
        return {
          nombre: result.nombre,
          tipo: result.tipo,
          imagen_url: result.imagen_url // URL de la imagen
        };
      });
      res.json(data);
    }
  });
})

routes.get('/images/:nombre', (req, res) => {
  const id = req.params.nombre;
  const sql = 'SELECT nombre, imagen, tipo FROM imagenesPrueba WHERE nombre = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.length === 0) {
      return res.status(404).send('Archivssso no encontrada.');
    }
    const { nombre, tipo, imagen } = result[0];
    
    res.setHeader('Content-Type', tipo);

    res.send(imagen);
  });
});


module.exports = routes;