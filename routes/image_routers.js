const express = require('express')
const routes = express.Router()
const multer  = require('multer')

routes.post('/', upload.single('imagen'), (req, res) =>{
    req.getConnection((err, conn) => {
        if(err) return res.send(err)
        const imagen = req.file

        console.log(imagen)

        res.send("Hola mundo si sirvio la imgen")
    })
})