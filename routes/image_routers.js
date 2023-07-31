const express = require('express');
const routes = express.Router();

const imagesController = require("../controllers/imagesController");

routes.post(
  "/images/:tabla",
  imagesController.upload,
  imagesController.uploadFile
);

module.exports = routes;