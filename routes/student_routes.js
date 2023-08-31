const express = require('express');
const routes = express.Router();
const bcrypt = require('bcrypt');
const db  = require('../dbConnection');
const multer = require('multer');
const fs = require('fs');
const path = require('path')

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../images'),
    /*destination: (req, file, cb) => {
        cb(null, 'images/');
    },*/
    filename: function (req, file, cb) {
        //cb(null, `${file.filename}_${Date.now}${path.extname(file.originalname)}`);
        //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        //cb(null, uniqueSuffix + path.extname(file.originalname));
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

    const { name, lastName, birthDate, gender, email, userName, password, detail, idMembership_fk, idRol_fk, razon, imagen} = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword)

        const sql = 'INSERT INTO PERSON (name, lastName, birthDate, gender, email, userName, password, detail, idMembership_fk, idRol_fk, razon, imagen) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)';
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



routes.put('/:idPerson', upload.single('image'), (req,res) => {
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
})

module.exports =routes;


/*

npm WARN config production Use `--omit=dev` instead.
﻿
> nodejs-app@1.0.0 start
﻿
> nodemon server.js
﻿
[nodemon] 2.0.22
﻿
[nodemon] to restart at any time, enter `rs`
﻿
[nodemon] watching path(s): *.*
﻿
[nodemon] watching extensions: js,mjs,json
﻿
[nodemon] starting `node server.js`
﻿
Example app listening on port 3000
﻿
Database is connected successfully !
﻿
/app/routes/student_routes.js:49
﻿
const nombre = req.file.originalname;
﻿
^
﻿
TypeError: Cannot read properties of undefined (reading 'originalname')
﻿
at /app/routes/student_routes.js:49:29
﻿
at Layer.handle [as handle_request] (/app/node_modules/express/lib/router/layer.js:95:5)
﻿
at next (/app/node_modules/express/lib/router/route.js:144:13)
﻿
at multerMiddleware (/app/node_modules/multer/lib/make-middleware.js:13:41)
﻿
at Layer.handle [as handle_request] (/app/node_modules/express/lib/router/layer.js:95:5)
﻿
at next (/app/node_modules/express/lib/router/route.js:144:13)
﻿
at Route.dispatch (/app/node_modules/express/lib/router/route.js:114:3)
﻿
at Layer.handle [as handle_request] (/app/node_modules/express/lib/router/layer.js:95:5)
﻿
at /app/node_modules/express/lib/router/index.js:284:15
﻿
at Function.process_params (/app/node_modules/express/lib/router/index.js:346:12)
﻿
[nodemon] app crashed - waiting for file changes before starting...

*/