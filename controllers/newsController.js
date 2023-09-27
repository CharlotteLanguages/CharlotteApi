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
    const { title, description, category, tags, detalles } = req.body;
    const nameImage = originalname;
    const imagenBuffer = buffer
    const tipo = mimetype
    const image = `https://apicharlotte.up.railway.app/news/${nameImage}`


    conn.query(
        "INSERT INTO " + req.params.tabla + " set ?",
        [{ title, description, category, tags, image, detalles, nameImage, imagenBuffer, tipo  }],
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

exports.updateFile = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    const { originalname, buffer, mimetype } = req.file;
    const { title, description, category, tags, detalles } = req.body;
    const nameImage = originalname;
    const imagenBuffer = buffer;
    const tipo = mimetype;
    const image = `https://apicharlotte.up.railway.app/news/${nameImage}`;

    const updateData = {
      title,
      description,
      category,
      tags,
      image,
      detalles,
      nameImage,
      imagenBuffer,
      tipo
    };

    conn.query(
      // Modifica la consulta para realizar una actualización
      "UPDATE " + req.params.tabla + " SET ? WHERE idNews = ?",
      [updateData, req.params.id], // Utiliza un identificador (por ejemplo, 'id') para especificar qué fila actualizar
      (err, rows) => {
        console.log(
          err
            ? "Err UPDATE " + req.params.tabla + " " + err
            : req.params.tabla + ": Updated"
        );
        res.json(
          err
            ? { err: "Error al actualizar la noticia" }
            : { msg: "Noticia actualizada con éxito." }
        );
      }
    );
  });
};
