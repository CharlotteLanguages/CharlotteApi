const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {
    req.getConnection((err, conn) => {
        if(err) return res.send(err)
        conn.query('SELECT * FROM razonNews', (err, rows) => {
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

routes.get('/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if(err) return res.send(err)
        conn.query('SELECT * FROM razonNews WHERE idNews = ?' [req.params.id],(err, rows) => {
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

routes.post('/', (req, res) => {
    req.getConnection((err, conn) => {
        if(err) return res.send(err)
        conn.query('INSERT INTO razonNews set ?', [req.body], (err, rows) => {
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

module.exports = routes;