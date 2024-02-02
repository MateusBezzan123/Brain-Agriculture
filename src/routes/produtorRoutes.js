const express = require('express');
const router = express.Router();
const produtorController = require('../controllers/produtorController');

router.get('/', produtorController.getAllProdutores);
router.get('/:id', produtorController.getProdutorById);
router.post('/', produtorController.createProdutor);
router.put('/:id', produtorController.updateProdutor);
router.delete('/:id', produtorController.deleteProdutor);

router.get('/totalFazendas', produtorController.getFazendasPorEstado);

module.exports = router;