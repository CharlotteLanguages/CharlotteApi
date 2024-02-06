const express = require('express');
const router = express.Router();
const connection = require('../dbConnection');

router.get('/download/:id', (req, res) => {
    const pdfId = req.params.id;

    // Obtén los datos del PDF desde la base de datos
    connection.query('SELECT pdf_name, pdf_data FROM pdf_table WHERE id = ?', [pdfId], (err, results) => {
        if (err) {
            console.error('Error al recuperar el PDF desde la base de datos: ', err);
            res.status(500).send('Error interno del servidor');
            return;
        }

        if (results.length === 0) {
            res.status(404).send('PDF no encontrado');
            return;
        }

        // Envía el PDF como respuesta
        const pdf = results[0];
        res.setHeader('Content-Disposition', `attachment; filename="${pdf.pdf_name}"`);
        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdf.pdf_data);
    });
});

module.exports = router;
