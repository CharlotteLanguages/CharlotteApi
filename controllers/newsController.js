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
              : { msg: "Noticia cargada con exito" }
          );
        }
      );
  });
};



exports.updateFile = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    const { idNews } = req.params; // Obtener el ID de la noticia que deseas actualizar
    const { title, description, category, tags, detalles } = req.body;

    const updateData = {
      title,
      description,
      category,
      tags,
      detalles,
    };

    // Si se proporciona una nueva imagen, también puedes actualizarla
    if (req.file) {
      const { originalname, buffer, mimetype } = req.file;
      const nameImage = originalname;
      const imagenBuffer = buffer;
      const tipo = mimetype;
      const image = `https://apicharlotte.up.railway.app/news/${nameImage}`;

      updateData.nameImage = nameImage;
      updateData.imagenBuffer = imagenBuffer;
      updateData.tipo = tipo;
      updateData.image = image;
    }

    conn.query(
      "UPDATE " + req.params.tabla + " SET ? WHERE idNews = ?",
      [updateData, idNews],
      (err, rows) => {
        console.log(
          err
            ? "Err UPDATE " + req.params.tabla + " " + err
            : req.params.tabla + ": News updated"
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
