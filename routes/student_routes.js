const express = require('express');
const routes = express.Router();
const bcrypt = require('bcrypt');

const db  = require('../dbConnection');

const multer = require('multer');
const fs = require('fs');
const path = require('path')
//const path = require('path');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../images'),
    filename: (req, file, cb) => {
        cb(null, `${file.filename}_${Date.now}${path.extname(file.originalname)}`);
    } 
});

const upload = multer({ storage: storage });
const host = 'https://apicharlotte.up.railway.app/'
const port = 5905
const localhost = 'http://localhost'

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

routes.post('/', upload.single("image"), async (req, res) =>{



    const { name, lastName, birthDate, gender, email, userName, password, detail, idMembership_fk, idRol_fk, razon } = req.body;
    const nombre = req.file.originalname;
    const imagen = `${host }public/${nombre}`

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword)

        const sql = 'INSERT INTO PERSON (name, lastName, birthDate, gender, email, userName, password, detail, idMembership_fk, idRol_fk, razon, imagen) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)';
        //const sql = 'INSERT INTO PERSON set ?';
        db.query(sql, [name, lastName, birthDate, gender, email, userName, hashedPassword, detail, idMembership_fk, idRol_fk, razon, imagen], (err, result) => {
        if (err) throw err;
        res.send('Usuario registrado correctamente.');
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al registrar el usuario.');
    }
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
