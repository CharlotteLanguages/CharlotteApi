const express = require('express');
const routes = express.Router()
const db = require('../dbConnection');
const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

routes.get('/news', (req, res) =>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT idNews, title, description, category, tags, image, nameImage, tipo, detalles FROM NEWS', (err, rows)=>{
                    if(err) return res.send(err)
                    res.json(rows)
                })
    })
})

routes.get('/:id', (req, res) =>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM NEWS WHERE idNews = ?', [req.params.id],(err, rows)=>{
                    if(err) return res.send(err)
                    res.json(rows)
                })
    })
})

routes.post('/', upload.single('image'), async (req, res) =>{
    const { originalname, buffer, mimetype } = req.file;
    const { title, description, category, tags, detalles } = req.body;
    const nameImage = originalname;
    const imagenBuffer = buffer
    const tipo = mimetype
    const image = `https://apicharlotte.up.railway.app/images/${nameImage}`

    db.query(
        "INSERT INTO NEWS set ?",
        [{ title, description, category, tags, image, detalles, nameImage, imagenBuffer, tipo  }],
        (err, rows) => {
          console.log(
            err
              ? "Err INSERT INTO " + req.params.tabla + " " + err
              : req.params.tabla + ": Image added!"
          );
          res.json(
            err
              ? { err: "Error al cargar la imagen" }
              : { msg: "Imagen cargada satisfactoriamente." }
          );
        }
      );
})

routes.delete('/:id', (req, res) =>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM NEWS WHERE idNews = ?', [req.params.id], (err, rows)=>{
                    if(err) return res.send(err)
                    res.json(rows)
                })
    })
})

routes.put('/:id', (req, res) =>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE NEWS set ? WHERE idNews = ?', [req.body, req.params.id], (err, rows)=>{
                    if(err) return res.send(err)
                    res.json(rows)
                })
    })
})

module.exports =routes;