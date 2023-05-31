const express = require('express');
const routes = express.Router()



routes.get('/', (req, res) =>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM RESENAS', (err, rows)=>{
                    if(err) return res.send(err)
                    res.json(rows)
                })
    })
})

routes.get('/:id', (req, res) =>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM RESENAS WHERE idResenas = ?', [req.params.id],(err, rows)=>{
                    if(err) return res.send(err)
                    res.json(rows)
                })
    })
})

routes.post('/', (req, res) =>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO RESENAS set ?', [req.body], (err, rows)=>{
                    if(err) return res.send(err)
                    res.json(rows)
                })
    })
})

routes.delete('/:id', (req, res) =>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM RESENAS WHERE idResenas = ?', [req.params.id], (err, rows)=>{
                    if(err) return res.send(err)
                    res.json(rows)
                })
    })
})

routes.put('/:id', (req, res) =>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE RESENAS set ? WHERE idResenas = ?', [req.body, req.params.id], (err, rows)=>{
                    if(err) return res.send(err)
                    res.json(rows)
                })
    })
})

module.exports =routes; 