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
    const { nombre, tipo, categoria } = req.body;
    const nameImage = originalname;
    const imageBuffer = buffer
    const tipoImagen = mimetype
    const image = `https://apicharlotte.up.railway.app/news/${nameImage}`


    conn.query(
        "INSERT INTO " + req.params.tabla + " set ?",
        [{ nombre, tipo, categoria, image, nameImage, tipoImagen, imageBuffer}],
        (err, rows) => {
          console.log(
            err
              ? "Err INSERT INTO " + req.params.tabla + " " + err
              : req.params.tabla + ": New add"
          );
          res.json(
            err
              ? { err: "Error al cargar la noticia" }
              : { msg: "Noticia cargada con exito." }
          );
        }
      );
  });
};