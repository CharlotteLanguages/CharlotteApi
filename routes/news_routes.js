const express = require('express');
const routes = express.Router();
const db = require('../dbConnection');

const imagesController = require("../controllers/newsController");

routes.post(
  "/newImage/:tabla",
  imagesController.upload,
  imagesController.uploadFile
);

/*routes.get('/news', (req, res) =>{
  const sql = 'SELECT idNews, title, description, category, tags, image as imagen_url, nameImage, tipo, detalles FROM NEWS'
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
})*/

routes.get('/news', (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err)
    conn.query('SELECT idNews, title, description, category, tags, image as imagen_url, nameImage, tipo, detalles FROM NEWS', (err, rows) => {
      if (err) return res.send(err)
      res.json(rows)
    })
  })
})

routes.get('/newImage/:nameImage', (req, res) => {
  const id = req.params.nameImage;
  const sql = 'SELECT title, description, category, tags, image, detalles, nameImage where nameImage = ?';

  db.query(sql, [id], (err, result) => {
    if(err) {
      return res.statusMessage(500).send(err);
    }
    if (result.length === 0) {
      return res.status(404).send('Archivo no encontrado.');
    }
    const { nameImage } = result[0];

    res.send(nameImage);
  })
}) 

module.exports = routes;