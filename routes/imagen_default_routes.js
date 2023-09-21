const express = require('express');
const routes = express.Router();
const db = require('../dbConnection');

const imagenesDefaulController = require("../controllers/imagesDefaultController");

routes.post(
  "/img/:tabla",
  imagenesDefaulController.upload,
  imagenesDefaulController.uploadFile
);

routes.get('/imagen', (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err)
    conn.query('SELECT id, imagen_url FROM imagen_por_defecto', (err, rows) => {
      if (err) return res.send(err)
      res.json(rows)
    })
  })
})

routes.get('/imagen/:id', (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err)
    conn.query('SELECT imagen_url, name_imagen FROM imagen_por_defecto WHERE id = ?', [req.params.id], (err, rows) => {
      if (err) return res.send(err)
      res.json(rows)
    })
  })
})

routes.get('/img/:name_imagen', (req, res) => {
  const id = req.params.name_imagen;
  const sql = 'SELECT name_imagen, tipo_imagen, imagen_buffer FROM imagen_por_defecto where name_imagen = ?';

  db.query(sql, [id], (err, result) => {
    if(err) {
      return res.statusMessage(500).send(err);
    }
    if (result.length === 0) {
      return res.status(404).send('Imagen no encontrado.');
    }
    const { tipo_imagen, imagen_buffer } = result[0];

    res.setHeader('Content-Type', tipo_imagen);

    res.send(imagen_buffer);
  })
}) 

routes.delete('/imagen/:id', (req, res) =>{
  req.getConnection((err, conn)=>{
      if(err) return res.send(err)
      conn.query('DELETE FROM imagen_por_defecto WHERE id = ?', [req.params.id], (err, rows)=>{
                  if(err) return res.send(err)
                  res.json(rows)
              })
  })
})

module.exports = routes;