/*const express = require('express');
const multer = require('multer')({
  dest: 'public/files'
})
const routes = express.Router();
const fs = require('fs')
const path = require('path')

const imagesController = require("../controllers/imagesController");

routes.post(
  "/images/:tabla",
  imagesController.upload,
  imagesController.uploadFile
);

routes.get('/', (req, res) =>{
  req.getConnection((err, conn)=>{
      if(err) return res.send(err)
      conn.query('SELECT * FROM newimagenes', (err, rows)=>{
                  if(err) return res.send(err)
                  res.json(rows)
              })
  })
})

module.exports =routes;*/


const express = require('express');
const routes = express.Router();

const imagesController = require("../controllers/imagesController");

routes.post(
  "/images/:tabla",
  imagesController.upload,
  imagesController.uploadFile
);

module.exports = routes;