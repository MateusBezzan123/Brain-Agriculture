const express = require('express');
const router = express.Router();
const produtorController = require('../controllers/produtorController');

router.get('/produtores', produtorController.getAllProdutores);
router.get('/produtores/:id', produtorController.getProdutorById);
router.post('/produtores', produtorController.createProdutor);
router.put('/produtores/:id', produtorController.updateProdutor);
router.delete('/produtores/:id', produtorController.deleteProdutor);

router.get('/total', produtorController.getFazendasPorEstado);
router.get('/fazendas', produtorController.getTotalFazendas);
router.get('/hectares', produtorController.getTotalHectares);


router.post('/cultura', produtorController.cadastrarCultura);
router.get('/fazendasPorCultura', produtorController.getFazendasPorCultura);
router.get('/usoDeSolo', produtorController.getUsoDeSolo);


module.exports = router;