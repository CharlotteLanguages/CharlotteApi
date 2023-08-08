const express = require('express');
const routes = express.Router()

const multer = require('multer');
const fs = require('fs');
const path = require('path');

routes.get('/', (req, res) =>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM PERSON', (err, rows)=>{
                    if(err) return res.send(err)
                    res.json(rows)
                })
    })

    routes.get('/:id', (req, res) =>{
        req.getConnection((err, conn)=>{
            if(err) return res.send(err)
            conn.query('SELECT * FROM PERSON WHERE idPerson = ?', [req.params.id],(err, rows)=>{
                        if(err) return res.send(err)
                        res.json(rows)
                    })
        })
    })
})

/*
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../images'),
    filename: (req, file, cb) => {
      cb(null, `${file.originalname}`);
    } 
  });

const upload = multer({ storage: storage });
const host = 'https://apicharlotte.up.railway.app/'
const port = 5905
const localhost = 'http://localhost'

exports.upload = upload.single("image");

exports.uploadFile = (req, res) => {
    req.getConnection((err, conn) => {
        
      if (err) return res.send(err);
  
      const tipo = req.file.mimetype;
      const nombre = req.file.originalname;
      const data = `${host }public/${nombre}`
  
      conn.query(
        "INSERT INTO PERSON set ?",
        [{ tipo, nombre, data }],
        (err, rows) => {
          console.log(
            err
              ? "Err INSERT INTO PERSON " + err
              : req.params.tabla + ": Image added!"
          );
          res.json(
            err
              ? { err: "Error al cargar la imagen" }
              : { msg: "Imagen cargada satisfactoriamente" }
          );
        }
      );
    });
  };

//INSERT INTO PERSON(name, lastName, birthDate, gender, email, userName, password, detail, idMembership_fk, idRol_fk, razon, imagen)
//VALUES('Default', 'Default', '2023-03-08', 'Default', 'Default@default.com', 'Default', 'Default', 'Default', 7, 1, 'null', '{"nombre": "Default", "tipo":"Default", "url": "Default.com"}')
*/

routes.post('/', (req, res) =>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO PERSON set ?', [req.body], (err, rows)=>{
                    if(err) return res.send(err)
                    res.json(rows)
                })
    })
})

routes.delete('/:id', (req, res) =>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM PERSON WHERE idPerson = ?', [req.params.id], (err, rows)=>{
                    if(err) return res.send(err)
                    res.json(rows)
                })
    })
})

routes.put('/:id', (req, res) =>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE PERSON set ? WHERE idPerson = ?', [req.body, req.params.id], (err, rows)=>{
                    if(err) return res.send(err)
                    res.json(rows)
                })
    })
})

module.exports =routes;
