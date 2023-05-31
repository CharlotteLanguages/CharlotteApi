const express = require('express');
const routes = express.Router()



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

routes.post('/', (req, res) =>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO CERTIFICADO set ?', [req.body], (err, rows)=>{
                    if(err) return res.send(err)
                    res.json(rows)
                })
    })
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