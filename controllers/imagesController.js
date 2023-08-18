const multer = require('multer');
const path = require('path');
const fs = require('fs')

const storage = multer.diskStorage({
  //destination: path.join(__dirname, '../images'),
  destination: (req, file, cb) => {
    cb(null, 'images/');
  },
  filename: (req, file, cb) => {
    //cb(null, `${Date.now()}-${file.originalname}`);
    cb(null,file.originalname);
  } 
});

const upload = multer({ storage });
const host = 'https://apicharlotte.up.railway.app/'
const port = 5905
const localhost = 'http://localhost'

exports.upload = upload.single("image");

exports.uploadFile = (req, res) => {
  req.getConnection((err, conn) => {
      
    if (err) return res.send(err);

    const tipo = req.file.mimetype;
    const nombre = req.file.originalname;
    const data = `${host }newimagenes/nombre/${nombre}`
   // const data = req.file.path;

    conn.query(
      "INSERT INTO " + req.params.tabla + " set ?",
      [{ tipo, nombre, data}],
      (err, rows) => {
        console.log(
          err
            ? "Err INSERT INTO " + req.params.tabla + " " + err
            : req.params.tabla + ": Image added!"
        );
        res.json(
          err
            ? { err: "Error al cargar la imagen" }
            : { msg: "Imagen cargada satisfactoriamente" }
        );
      }
    );
  });
};
