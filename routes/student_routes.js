/*const express = require('express');
const routes = express.Router();
const bcrypt = require('bcrypt');
const db  = require('../dbConnection');
const multer = require('multer');
const fs = require('fs');
const path = require('path')

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../images'),
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}`);
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

routes.post('/', async (req, res) =>{

    const { name, lastName, birthDate, gender, email, userName, password, detail, idMembership_fk, idRol_fk} = req.body;
    const imagen = `https://apicharlotte.up.railway.app/img/userDefault.jpg`

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword)

        const sql = 'INSERT INTO PERSON (name, lastName, birthDate, gender, email, userName, password, detail, idMembership_fk, idRol_fk, imagen) VALUES(?,?,?,?,?,?,?,?,?,?,?)';
        db.query(sql, [name, lastName, birthDate, gender, email, userName, hashedPassword, detail, idMembership_fk, idRol_fk, imagen], (err, result) => {
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



/*routes.put('/:idPerson', upload.single('image'), (req,res) => {
    const { name, lastName, birthDate, gender, email, userName, password, detail, idMembership_fk, idRol_fk, razon} = req.body;

    const names = req.file.originalname;
    const image = `${host }image/${names}`
    try {
        const sql = 'UPDATE PERSON SET (name, lastName, birthDate, gender, email, userName, password, detail, idMembership_fk, idRol_fk, razon, image) VALUES(?,?,?,?,?,?,?,?,?,?,?,?) WHERE idPerson = ?';
        db.query(sql, [name, lastName, birthDate, gender, email, userName, password, detail, idMembership_fk, idRol_fk, razon, image, req.params[idPerson]], (err, result) => {
        if (err) throw err;
        res.send('Usuario registrado correctamente.');
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al registrar el usuario.');
    }
})]*/


// Ruta para actualizar un usuario por ID
/*routes.put('/update/:id', async (req, res) => {
    const userId = req.params.id; // Obtiene el ID del usuario de la URL
    const { name, lastName, birthDate, gender, email, userName, password, detail, idMembership_fk, idRol_fk, imagen } = req.body;

    try {
        let hashedPassword = password;

        if (password) {
            // Si se proporcionó una nueva contraseña, hasheala
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const updateData = {
            name,
            lastName,
            birthDate,
            gender,
            email,
            userName,
            password: hashedPassword,
            detail,
            idMembership_fk,
            idRol_fk,
            imagen,
        };

        const sql = 'UPDATE PERSON SET ? WHERE idPerson = ?';
        db.query(sql, [updateData, userId], (err, result) => {
            if (err) throw err;
            res.send('Usuario actualizado correctamente.');
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al actualizar el usuario.');
    }
});

  

module.exports =routes;*/

const multer = require('multer');
const path = require('path');
const fs = require('fs')

const express = require('express');
const routes = express.Router();
const db = require('../dbConnection');

const imagesController = require("../controllers/studentController");
const { SourceTextModule } = require('vm');

routes.post(
    "/:tabla",
    imagesController.upload,
    imagesController.updloadFile
);

routes.get('/', (req, res) => {
    req.getConnection((err, conn) => {
        if(err) return res.send(err)
        conn.query('SELECT idPerson, name, lastName, birthDate, gender, email, userName, password, detail, idMembership_fk, idRol_fk, imagen FROM PERSON', (errr, rows) => {
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

routes.get('/:id', (req, res) => {
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

        res.setHeader('content-Type', tipo);

        res.send(imageBuffer);
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

module.exports = routes;