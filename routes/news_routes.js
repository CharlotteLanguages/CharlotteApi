const multer = require('multer');
const path = require('path');
const fs = require('fs')

const express = require('express');
const routes = express.Router();
const db = require('../dbConnection');

const imagesController = require("../controllers/newsController");
const { SourceTextModule } = require('vm');

routes.post(
  "/new",
  imagesController.upload,
  imagesController.uploadFile
);

routes.put(
  "/new/:idNews",
  imagesController.upload,
  imagesController.updateImage
);

routes.get('/new', (req, res) => {
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
    conn.query('SELECT idNews, title, description, category, tags, image as imagen_url, nameImage, tipo, detalles FROM NEWS WHERE idNews = ?', [req.params.id], (err, rows) => {
      if (err) return res.send(err)
      res.json(rows)
    })
  })
})

routes.get('/new/:nameImage', (req, res) => {
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

routes.put('/new/:id', (req, res) =>{
  req.getConnection((err, conn)=>{
      if(err) return res.send(err)
      conn.query('UPDATE NEWS set ? WHERE idNews = ?', [req.body, req.params.id], (err, rows)=>{
                  if(err) return res.send(err)
                  res.json(rows)
              })
  })
})

routes.delete('/new/:id', (req, res) =>{
  req.getConnection((err, conn)=>{
      if(err) return res.send(err)
      conn.query('DELETE FROM NEWS WHERE idNews = ?', [req.params.id], (err, rows)=>{
                  if(err) return res.send(err)
                  res.json(rows)
              })
  })
})

module.exports = routes;