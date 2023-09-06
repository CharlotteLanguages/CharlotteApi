const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

exports.upload = upload.single("image");

exports.uploadFile = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    const {originalname, buffer, mimetype} = req.file;
    const nombre = originalname;
    const imagen = buffer;
    const tipo = mimetype;
    const url = `https://apicharlotte.up.railway.app/images/${nombre}`;

    conn.query(
      "INSERT INTO " + req.params.tabla + " set ?",
      [{ nombre, imagen, tipo, url  }],
      (err, rows) => {
        console.log(
          err
            ? "Err INSERT INTO " + req.params.tabla + " " + err
            : req.params.tabla + ": Image added!"
        );
        res.json(
          err
            ? { err: "Error al cargar la imagen" }
            : { msg: "Imagen cargada satisfactoriamente." }
        );
      }
    );
  });
};