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
        conn.query('SELECT * FROM PATROCINADOR', (err, rows)=>{
                    if(err) return res.send(err)
                    res.json(rows)
                })
    })
})

routes.get('/:id', (req, res) =>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM PATROCINADOR WHERE idPatrocinador = ?', [req.params.id],(err, rows)=>{
                    if(err) return res.send(err)
                    res.json(rows)
                })
    })
})

routes.post('/', upload.single('image'), async (req, res) =>{
    const { nombre, direccion, webSite, razon } = req.body;
    const name = req.file.originalname;
    const image = `${host }public/${name}`

    try {
        const sql = 'INSERT INTO PATROCINADOR (nombre, direccion, webSite, image, razon) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [nombre, direccion, webSite, image, razon], (err, result) =>{
            if(err) throw err;
            res.send('Imagen cargada con exito');
        })
    } catch(err) {
        console.error(err)
        res.status(500).send('Error al cargar imagen.');
    }
})

routes.delete('/:id', (req, res) =>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM PATROCINADOR WHERE idPatrocinador = ?', [req.params.id], (err, rows)=>{
                    if(err) return res.send(err)
                    res.json(rows)
                })
    })
})

routes.put('/:id', (req, res) =>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE PATROCINADOR set ? WHERE idPatrocinador = ?', [req.body, req.params.id], (err, rows)=>{
                    if(err) return res.send(err)
                    res.json(rows)
                })
    })
})

module.exports =routes;