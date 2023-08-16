const express = require('express');
const routes = express.Router()
const db = require('../dbConnection');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../images'),
    filename: (req, file, cb) => {
        cb(null, `${file.filename}_${Date.now}${path.extname(file.originalname)}`);
    } 
});

const upload = multer({ storage: storage });
const host = 'https://apicharlotte.up.railway.app/'

routes.get('/', (req, res) =>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM CERTIFICADO', (err, rows)=>{
                    if(err) return res.send(err)
                    res.json(rows)
                })
    })
})

routes.get('/:id', (req, res) =>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM CERTIFICADO WHERE idCertificado = ?', [req.params.id],(err, rows)=>{
                    if(err) return res.send(err)
                    res.json(rows)
                })
    })
})

routes.post('/', upload.single('image'), async (req, res) =>{
const { nombre, tipo, categoria, razon } = req.body;
const name = req.file.originalname;
const image = `${host }public/${name}`

try {
    const sql = 'INSERT INTO CERTIFICADO (nombre, tipo, categoria, image, razon) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [nombre, tipo, categoria, image, razon], (err, result) =>{
        if(err) throw err;
        res.send('Certificado cargado con exito');
    })
} catch(err) {
    console.error(err)
    res.status(500).send('Error al cargar certificado.');
}
})

routes.delete('/:id', (req, res) =>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM CERTIFICADO WHERE idCertificado = ?', [req.params.id], (err, rows)=>{
                    if(err) return res.send(err)
                    res.json(rows)
                })
    })
})

routes.put('/:id', (req, res) =>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE CERTIFICADO set ? WHERE idCertificado = ?', [req.body, req.params.id], (err, rows)=>{
                    if(err) return res.send(err)
                    res.json(rows)
                })
    })
})

module.exports =routes;

/*const { name, lastName, birthDate, gender, email, userName, password, detail, idMembership_fk, idRol_fk, razon } = req.body;
    const nombre = req.file.originalname;
    //const imagen = `${host }public/${nombre}`
    const imagen = req.file.path;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO PERSON (name, lastName, birthDate, gender, email, userName, password, detail, idMembership_fk, idRol_fk, razon, imagen) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)';
        
        db.query(sql, [name, lastName, birthDate, gender, email, userName, hashedPassword, detail, idMembership_fk, idRol_fk, razon, imagen], (err, result) => {
        if (err) throw err;
        res.send('Usuario registrado correctamente.');
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al registrar el usuario.');
    }*/

    /*
    if(!req.file) {
        return res.status(400).send('No ha cargado ninguna imagen');
    }

    const { name, lastName, birthDate, gender, email, userName, password, detail, idMembership_fk, idRol_fk, razon } = req.body;
    const imageUrl = req.file.path;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO PERSON (name, lastName, birthDate, gender, email, userName, password, detail, idMembership_fk, idRol_fk, razon, imagen) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)';

    db.query(sql, [name, lastName, birthDate, gender, email, userName, hashedPassword, detail, idMembership_fk, idRol_fk, razon, imageUrl], (err, result) => {
        if (err)  throw err;
        console.log('Imagen subido y registrada en la base de datos');
        res.send('Imagen subida y registrada en la base de datos')
    });
    */