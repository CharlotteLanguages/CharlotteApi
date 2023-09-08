const express = require('express');
const routes = express.Router();
const db = require('../dbConnection');

const imagesController = require("../controllers/newsController");

routes.post(
  "/new/:tabla",
  imagesController.upload,
  imagesController.uploadFile
);

routes.get('/news', (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err)
    conn.query('SELECT idNews, title, description, category, tags, image as imagen_url, nameImage, tipo, detalles FROM NEWS', (err, rows) => {
      if (err) return res.send(err)
      res.json(rows)
    })
  })
})

routes.get('/new/:id', (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err)
    conn.query('SELECT title, description, category, tags, image as imagen_url, nameImage, tipo, detalles FROM NEWS WHERE idNews = ?', [req.params.id], (err, rows) => {
      if (err) return res.send(err)
      res.json(rows)
    })
  })
})

routes.get('/news/:nameImage', (req, res) => {
  const id = req.params.nameImage;
  const sql = 'SELECT nameImage, tipo, imagenBuffer FROM NEWS where nameImage = ?';

  db.query(sql, [id], (err, result) => {
    if(err) {
      return res.statusMessage(500).send(err);
    }
    if (result.length === 0) {
      return res.status(404).send('Archivo no encontrado.');
    }
    const { tipo, imagenBuffer } = result[0];

    res.setHeader('Content-Type', tipo);

    res.send(imagenBuffer);
  })
}) 

routes.delete('/news/:id', (req, res) =>{
  req.getConnection((err, conn)=>{
      if(err) return res.send(err)
      conn.query('DELETE FROM NEWS WHERE idNews = ?', [req.params.id], (err, rows)=>{
                  if(err) return res.send(err)
                  res.json(rows)
              })
  })
})

module.exports = routes;