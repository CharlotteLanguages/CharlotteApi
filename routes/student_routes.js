const multer = require('multer');
const path = require('path');
const fs = require('fs')

const express = require('express');
const routes = express.Router();
const db = require('../dbConnection');

const imagesController = require("../controllers/studentController");
//const { SourceTextModule } = require('vm');

routes.post(
    "student/:tabla",
    imagesController.upload,
    imagesController.updloadFile
);

routes.get('/student', (req, res) => {
    req.getConnection((err, conn) => {
        if(err) return res.send(err)
        conn.query('SELECT idPerson, name, lastName, birthDate, gender, email, userName, password, detail, idMembership_fk, idRol_fk, imagen FROM PERSON', (err, rows) => {
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

routes.get('/student/:id', (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT idPerson, name, lastName, birthDate, gender, email, userName, password, detail, idMembership_fk, idRol_fk, imagen FROM PERSON WHERE idPerson = ?' , [req.params.id], (err, rows) => {
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

routes.get('/student/:nameImagen', (req, res) => {
    const id = req.params.nameImagen;
    const sql = 'SELECT nameImagen, tipo, imageBuffer FROM PERSON WHERE nameImagen = ?';

    db.query(sql, [id], (err, result) => {
        if(err) {
            return res.statusMessage(500).send(err);
        }
        if(result.length === 0) {
            return res.status(404).send('Archivo no encontrado.');
        }
        const { tipo, imageBuffer } = result[0];

        res.setHeader('Content-Type', tipo);

        res.send(imageBuffer);
    })
})

routes.delete('student/:id', (req, res) =>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM PERSON WHERE idPerson = ?', [req.params.id], (err, rows)=>{
                    if(err) return res.send(err)
                    res.json(rows)
                })
    })
  })

module.exports = routes;