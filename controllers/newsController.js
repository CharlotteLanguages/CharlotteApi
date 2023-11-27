const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

exports.upload = upload.single("image");

exports.uploadFile = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    const { originalname, buffer, mimetype } = req.file;
    const { title, description, category, tags, detalles } = req.body;
    const nameImage = originalname;
    const imagenBuffer = buffer;
    const tipo = mimetype;
    const image = `https://apicharlotte.up.railway.app/news/${nameImage}`;

    console.log('req.body:', req.body);
    console.log('req.file:', req.file);

    conn.query(
      "INSERT INTO NEWS SET ?",
      [{ title, description, category, tags, image, detalles, nameImage, imagenBuffer, tipo }],
      (err, rows) => {
        console.log(
          err
            ? "Err INSERT INTO " + req.params.tabla + " " + err
            : req.params.tabla + ": New add"
        );
        res.json(
          err
            ? { err: "Error loading the news" }
            : { msg: "News loaded with success" }
        );
      }
    );
  });
};
exports.updateImage = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    const { title, description, category, tags, detalles } = req.body;
    const updatedFields = {};
    
    if (title) updatedFields.title = title;
    if (description) updatedFields.description = description;
    if (category) updatedFields.category = category;
    if (tags) updatedFields.tags = tags;
    if (detalles) updatedFields.detalles = detalles;

    // Si se proporciona una nueva imagen, actualizar los campos relacionados con la imagen
    if (req.file) {
      const { originalname, buffer, mimetype } = req.file;
      const nameImage = originalname;
      const tipo = mimetype;
      const image = `https://apicharlotte.up.railway.app/news/${nameImage}`;

      updatedFields.nameImage = nameImage;
      updatedFields.imagenBuffer = buffer;
      updatedFields.tipo = tipo;
      updatedFields.image = image;
    }

    conn.query(
      "UPDATE NEWS SET ? WHERE idNews = ?",
      [updatedFields, req.params.idNews],  
      (err, rows) => {
        console.log(
          err
            ? "Err UPDATE " + req.params.tabla + " " + err
            : req.params.tabla + ": Updated"
        );
        res.json(
          err
            ? { err: "Error updating the news" }
            : { msg: "News updated successfully" }
        );
      }
    );
  });
};
