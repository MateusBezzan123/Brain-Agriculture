const express = require('express');
const router = express.Router();
const produtorController = require('../controllers/produtorController');

router.post('/', produtorController.createProdutor);


module.exports = router;