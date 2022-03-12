const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdf.controller');

router.get('/', pdfController.print); 

module.exports = router;
