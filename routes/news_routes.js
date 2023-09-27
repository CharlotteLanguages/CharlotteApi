const multer = require('multer');
const path = require('path');
const fs = require('fs')

const express = require('express');
const routes = express.Router();
const db = require('../dbConnection');

const imagesController = require("../controllers/newsController");
const { SourceTextModule } = require('vm');

routes.post(
  "/new/:tabla",
  imagesController.upload,
  imagesController.uploadFile
);

routes.put(
  "new/:tabla/:id",
  imagesController.updateFile
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

/*routes.put('/new/:id', (req, res) =>{
  console.log('entra al update 1!');
  req.getConnection((err, conn)=>{
    console.log('entra al update!');
      if(err) return res.send(err)
      conn.query('UPDATE NEWS set ? WHERE idNews = ?', [req.body, req.params.id], (err, rows)=>{
                  if(err) return res.send(err)
                  res.json(rows)
              })
  })
})*/

routes.put('/new/:id', (req, res) => {
  console.log('entra al update 1!');
  req.getConnection((err, conn) => {
    console.log('entra al update 2!');
    if (err) return res.send(err);

    const { originalname, buffer, mimetype } = req.file;
    const { title, description, category, tags, detalles } = req.body;
    const nameImage = originalname;
    const imagenBuffer = buffer;
    const tipo = mimetype;
    const image = `https://apicharlotte.up.railway.app/news/${nameImage}`;

    const updateData = {
      title,
      description,
      category,
      tags,
      image,
      detalles,
      nameImage,
      imagenBuffer,
      tipo
    };

    conn.query(
      // Modifica la consulta para realizar una actualización
      "UPDATE NEWS SET ? WHERE idNews = ?",
      [updateData, req.params.id], // Utiliza un identificador (por ejemplo, 'id') para especificar qué fila actualizar
      (err, rows) => {
        console.log(
          err
            ? "Err UPDATE " + req.params.tabla + " " + err
            : req.params.tabla + ": Updated"
        );
        res.json(
          err
            ? { err: "Error al actualizar la noticia" }
            : { msg: "Noticia actualizada con éxito." }
        );
      }
    );
  });
})

module.exports = routes;