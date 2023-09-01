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

routes.get('/images/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT nombre, imagen FROM imagenesPrueba WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.length === 0) {
      return res.status(404).send('Imagen no encontrada.');
    }
    const { nombre, imagen } = result[0];
    res.setHeader('Content-Type', 'image/jpeg'); // Ajusta el tipo de contenido según tu tipo de imagen
    res.send(imagen);
  });
});


module.exports = routes;