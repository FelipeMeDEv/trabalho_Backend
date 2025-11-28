const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middlewares/auth');
const tarefaController = require('../controllers/tarefaController');

// Middleware de validação para retornar 422 conforme Swagger
const validar = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};

router.get('/', tarefaController.listarTarefas);

router.get('/:id', tarefaController.obterTarefa);

router.post('/', [
    // Auth opcional no GET, mas obrigatório aqui se desejar (o swagger não marcou security no POST, mas é boa prática)
    auth, 
    check('nome', 'Nome é obrigatório').not().isEmpty(),
    validar
], tarefaController.criarTarefa);

router.put('/:id', [
    auth, // Swagger exige token aqui
    check('nome').optional().not().isEmpty(),
    check('concluida').optional().isBoolean(),
    validar
], tarefaController.atualizarTarefa);

router.delete('/:id', auth, tarefaController.deletarTarefa);

module.exports = router;