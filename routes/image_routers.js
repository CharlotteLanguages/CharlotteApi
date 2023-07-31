const express = require('express');
const routes = express.Router();

const imagesController = require("../controllers/imagesController");

routes.post(
  "/images/:tabla",
  imagesController.upload,
  imagesController.uploadFile
);

routes.get('/images', (req, res) =>{
  req.getConnection((err, conn)=>{
      if(err) return res.send(err)
      conn.query('SELECT * FROM IMAGEN', (err, rows)=>{
                  if(err) return res.send(err)
                  res.json(rows)
              })
  })
})

module.exports = routes;