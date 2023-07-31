const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../images"),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

exports.upload = upload.single("image");

exports.uploadFile = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    const tipo = req.file.mimetype;
    const nombre = req.file.originalname;
    /*const date = fs.readFileSync(
      path.join(__dirname, "../../images/" + req.file.filename)
    );*/

    conn.query(
      "INSERT INTO " + req.params.tabla + " set ?",
      [{ tipo, nombre }],
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

exports.showFile = (req, res) => {
    req.getConnection((err, conn) => {
      if (err) return res.send(err);
  
      const tipo = req.file.mimetype;
      const nombre = req.file.originalname;
  
      conn.query(
        "SELECT * FROM " + req.params.tabla + " set ?",
        [{ tipo, nombre }],
        (err, rows) => {
          console.log(
            err
              ? "Err SELECT * FROM " + req.params.tabla + " " + err
              : req.params.tabla + ": Image added!"
          );
          res.json(
            err
              ? { err: "Error al mostrar la imagen" }
              : { msg: "Imagen cargada satisfactoriamente" }
          );
        }
      );
    });
  };