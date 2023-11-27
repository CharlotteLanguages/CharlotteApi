const multer = require('multer');
const path = require('path');
const fs = require('fs')

const express = require('express');
const routes = express.Router();
const db = require('../dbConnection');

const imagesController = require("../controllers/patrocinadorController");
const { SourceTextModule } = require('vm');

routes.post(
    "/",
    imagesController.upload,
    imagesController.uploadFile
);

routes.put(
    "/:idPatrocinador",
    imagesController.upload,
    imagesController.updateImage
);

routes.get('/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('SELECT idPatrocinador, nombre, direccion, webSite, image as imagen_url, nameImage, tipo FROM PATROCINADOR', (err, rows) => {
            if (err) return res.send(err)
            res.json(rows)
        })
    })
})

routes.get('/:id', (req, res) => {
    req.getConnection((err, conn) => {
      if (err) return res.send(err)
      conn.query('SELECT idPatrocinador, nombre, direccion, webSite, image as imagen_url, nameImage, tipo FROM PATROCINADOR WHERE idPatrocinador = ?', [req.params.id], (err, rows) => {
        if (err) return res.send(err)
        res.json(rows)
      })
    })
  })

  //Metodo para mostrar la imagen de perfil de los patrocinadores
routes.get('/sponsor/:nameImage', (req, res) => {
    console.log("Entra aqui sponsor")
    const id = req.params.nameImage;
    const sql = 'SELECT nameImage, tipo, imagenBuffer FROM PATROCINADOR WHERE nameImage = ?';

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

routes.delete('/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('DELETE FROM PATROCINADOR WHERE idPatrocinador = ?', [req.params.id], (err, rows) => {
            if (err) return res.send(err)
            res.json(rows)
        })
    })
})

module.exports =routes;