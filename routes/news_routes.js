const express = require('express');
const routes = express.Router()
const db = require('../dbConnection');
const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

routes.get('/', (req, res) =>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT idNews, title, description, category, tags, image, detalles FROM NEWS', (err, rows)=>{
                    if(err) return res.send(err)
                    res.json(rows)
                })
    })
})

routes.get('/:id', (req, res) =>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT idNews, title, description, category, tags, image, detalles FROM NEWS WHERE idNews = ?', [req.params.id],(err, rows)=>{
                    if(err) return res.send(err)
                    res.json(rows)
                })
    })
})

routes.post('/', upload.single('image'), async (req, res) =>{
    const { originalname, buffer, title, description, category, tags, detalles, mimetype } = req.file;
    const nameImage = originalname;
    const imagenBuffer = buffer
    const tipo = mimetype
    const image = `https://apicharlotte.up.railway.app/images/${nameImage}`

    /*try {
        const sql = 'INSERT INTO NEWS title, description, category, tags, image, detalles, nameImage, imagenBuffer VALUES (?,?,?,?,?,?,?,?)';
        db.query(sql, [title, description, category, tags, image, detalles, nameImage, imagenBuffer], (err, result) =>{
            if(err) throw err;
            res.send('Imagen cargada con exito.');
        })
    } catch(err) {
        console.error(err)
        res.status(500).send('Error al cargar certificado.');
    }*/

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