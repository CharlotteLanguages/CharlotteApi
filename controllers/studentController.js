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
        const imagen = `https://apicharlotte.up.railway.app/student/student/${nameImagen}`

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

exports.updateImage = (req, res) => {
    req.getConnection((err, conn) => {
      if (err) return res.send(err);
  
      const { name, lastName, birthDate, gender, email, password, detail, idMembership_fk, idRol_fk } = req.body;
      const updatedFields = {};
      
      if (name) updatedFields.name = name;
      if (lastName) updatedFields.lastName = lastName;
      if (birthDate) updatedFields.birthDate = birthDate;
      if (gender) updatedFields.gender = gender;
      if (email) updatedFields.email = email;
      if (password) updatedFields.password = password;
      if (detail) updatedFields.detail = detail;
      if (idMembership_fk) updatedFields.idMembership_fk = idMembership_fk;
      if (idRol_fk) updatedFields.idRol_fk = idRol_fk;
  
      // Si se proporciona una nueva imagen, actualizar los campos relacionados con la imagen
      if (req.file) {
        const { originalname, buffer, mimetype } = req.file;
        const nameImagen = originalname;
        const tipo = mimetype;
        const imagen = `https://apicharlotte.up.railway.app/student/student/${nameImagen}`;
  
        updatedFields.nameImagen = nameImagen;
        updatedFields.imageBuffer = buffer;
        updatedFields.tipo = tipo;
        updatedFields.imagen = imagen;
      }
  
      conn.query(
        "UPDATE PERSON SET ? WHERE idPerson = ?",
        [updatedFields, req.params.idPerson],  
        (err, rows) => {
          console.log(
            err
              ? "Err UPDATE " + req.params.tabla + " " + err
              : req.params.tabla + ": Updated"
          );
          res.json(
            err
              ? { err: "Error updating the student" }
              : { msg: "Student updated successfully" }
          );
        }
      );
    });
  };