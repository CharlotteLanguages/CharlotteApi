const multer = require('multer');
const path = require('path');
const fs = require('fs')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

exports.upload = upload.single("image");

exports.updloadFile = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);

        const { name, lastName, birthDate, gender, email, userName, password, detail, idMembership_fk, idRol_fk } = req.body;
        const { originalname, buffer, mimetype } = req.file;
        const nameImagen = originalname;
        const imageBuffer = buffer
        const tipo = mimetype
        const imagen = `https://apicharlotte.up.railway.app/student/${nameImagen}`

        conn.query(
            "INSERT INTO " + req.params.tabla + " set ?",
            [{ name, lastName, birthDate, gender, email, userName, password, detail, idMembership_fk, idRol_fk, imagen, nameImagen, imageBuffer, tipo }],
            (err, rows) => {
                console.log(
                    err
                    ? "Err INSERT INTO " + req.params.tabla + " " + err
                    : req.params.tabla + ": New add"
                ); 
                res.json(
                    err
                    ? { err: "Error al cargar el estudiante" }
                    : { message: "Estudiante cargado correctamente" }
                );
            }
        );
    });
};