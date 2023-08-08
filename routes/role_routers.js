const express = require('express');
const routes = express.Router()

routes.get('/', (req, res) =>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM ROLE inner join IMAGEN on ROLE.imagen_fk = IMAGEN.idImagen', (err, rows)=>{
                    if(err) return res.send(err)
                    res.json(rows)
                })
    })
})

module.exports = routes;
