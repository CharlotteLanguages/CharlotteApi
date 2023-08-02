const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../images'),
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  } 
});

const upload = multer({ storage: storage });
const localhost = 'http://localhost'

exports.upload = upload.single("image");

exports.uploadFile = (req, res) => {
  req.getConnection((err, conn) => {
      
    if (err) return res.send(err);

    const tipo = req.file.mimetype;
    const nombre = req.file.originalname;
    /*const data = fs.readFileSync(
      path.join(__dirname, "../../images/" + req.file.filename)
    );*/
    const data = `${process.env.HOST || localhost }:${process.env.PORT || 3000}/public/${nombre}`

    conn.query(
      "INSERT INTO " + req.params.tabla + " set ?",
      [{ tipo, nombre, data }],
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
