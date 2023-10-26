const express = require('express');
const app = express();
const multer = require('multer');
const bodyParser = require('body-parser');
const db = require('../dbConnection');
const routes = express.Router()

app.use(bodyParser.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });  

  routes.post('/', upload.single('images'), (req, res) =>{
    const { originalname, buffer, nombre, apellido, direccion, telefono } = req.file;
    const name = originalname
    const imagen = buffer
    const urlImagen = `https://apicharlotte.up.railway.app/images/${name}`

    try {
        const sql = 'INSERT INTO persones (nombre, apellido, direccion, telefono, imagen, urlImagen) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(sql, [nombre, apellido, direccion, telefono, imagen, urlImagen], (err, result) =>{
            if(err) throw err;
            res.send('Persona registrada con exito.');
        })
    } catch(err) {
        console.error(err)
        res.status(500).send('Error al registrar persona.');
    }
})


// Ruta para obtener los detalles de una persona por su ID
routes.get('/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM persones WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result.length === 0) {
        return res.status(404).send('Persona no encontrada.');
      }
      const persona = result[0];
      
      // Convierte la imagen de base64 a Buffer
      const imagenBuffer = persona.imagen ? Buffer.from(persona.imagen, 'base64') : null;
      persona.imagen = imagenBuffer;
  
      res.json(persona);
    });
  });
  

  routes.get('/', (req, res) =>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM persones', (err, rows)=>{
                    if(err) return res.send(err)
                    res.json(rows)
                })
    })
})


module.exports =routes;