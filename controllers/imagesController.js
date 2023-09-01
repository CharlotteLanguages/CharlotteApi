/*const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/subirimagen', upload.single('imagen'), (req, res) => {
  const { originalname, buffer } = req.file;
  const nombre = originalname;
  const imagen = buffer;

  const sql = 'INSERT INTO imagenes (nombre, imagen) VALUES (?, ?)';
  db.query(sql, [nombre, imagen], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('Imagen subida con éxito.');
  });
});
*/


const multer = require('multer');
const path = require('path');
const fs = require('fs');

/*const storage = multer.diskStorage({
  destination: path.join(__dirname, '../images'),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});*/

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });
const host = 'https://apicharlotte.up.railway.app/'
const port = 5905

exports.upload = upload.single("image");

exports.uploadFile = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    //const tipo = req.file.mimetype;
    const {originalname, buffer} = req.file;
    //const nombre = req.file.originalname;
    const nombre = originalname;
    //const data = `${host }public/${nombre}`
    const imagen = buffer;

    conn.query(
      "INSERT INTO " + req.params.tabla + " set ?",
      [{ nombre, imagen }],
      (err, rows) => {
        console.log(
          err
            ? "Err INSERT INTO " + req.params.tabla + " " + err
            : req.params.tabla + ": Image added!"
        );
        res.json(
          err
            ? { err: "Error al cargar la imagen" }
            : { msg: "Imagen cargada satisfactoriamente." }
        );
      }
    );
  });
};