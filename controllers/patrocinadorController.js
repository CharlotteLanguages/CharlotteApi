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
    const { nombre, direccion, webSite } = req.body;
    const nameImage = originalname;
    const imagenBuffer = buffer;
    const tipo = mimetype;
    const image = `https://apicharlotte.up.railway.app/sponsor/sponsor/${nameImage}`


    conn.query(
        "INSERT INTO PATROCINADOR set ?",
        [{ nombre, direccion, webSite, image, nameImage, imagenBuffer, tipo  }],
        (err, rows) => {
          console.log(
            err
              ? "Err INSERT INTO " + req.params.tabla + " " + err
              : req.params.tabla + ": New add"
          );
          res.json(
            err
              ? { err: "Error loading sponsor" }
              : { msg: "Sponsor loaded with success" }
          );
        }
      );
  });
};

exports.updateImage = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    const { nombre, direccion, webSite } = req.body;
    const updatedFields = {};
    
    if (nombre) updatedFields.nombre = nombre;
    if (direccion) updatedFields.direccion = direccion;
    if (webSite) updatedFields.webSite = webSite;
    
    // Si se proporciona una nueva imagen, actualizar los campos relacionados con la imagen
    if (req.file) {
      const { originalname, buffer, mimetype } = req.file;
      const nameImage = originalname;
      const tipo = mimetype;
      const image = `https://apicharlotte.up.railway.app/sponsor/sponsor/${nameImage}`;

      updatedFields.nameImage = nameImage;
      updatedFields.imagenBuffer = buffer;
      updatedFields.tipo = tipo;
      updatedFields.image = image;
    }

    conn.query(
      "UPDATE PATROCINADOR SET ? WHERE idPatrocinador = ?",
      [updatedFields, req.params.idPatrocinador],  
      (err, rows) => {
        console.log(
          err
            ? "Err UPDATE " + req.params.tabla + " " + err
            : req.params.tabla + ": Updated"
        );
        res.json(
          err
            ? { err: "Error updating the sponsor" }
            : { msg: "Sponsor updated successfully" }
        );
      }
    );
  });
};