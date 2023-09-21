const multer = require('multer');
const path = require('path');
const fs = require('fs')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

exports.upload = upload.single("image");

exports.uploadFile = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    const { originalname, buffer, mimetype } = req.file;
    const name_imagen = originalname;
    const imagen_buffer = buffer
    const tipo_imagen = mimetype
    const imagen_url = `https://apicharlotte.up.railway.app/imagen/${name_imagen}`


    conn.query(
        "INSERT INTO " + req.params.tabla + " set ?",
        [{ imagen_buffer, tipo_imagen, imagen_url, name_imagen  }],
        (err, rows) => {
          console.log(
            err
              ? "Err INSERT INTO " + req.params.tabla + " " + err
              : req.params.tabla + ": New add"
          );
          res.json(
            err
              ? { err: "Error al cargar la imagen." }
              : { msg: "Imagen cargada con exito." }
          );
        }
      );
  });
};