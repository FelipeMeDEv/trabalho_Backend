const Tarefa = require('../models/Tarefa');

exports.listarTarefas = async (req, res) => {
    try {
        const tarefas = await Tarefa.find();
        res.json(tarefas);
    } catch (err) {
        res.status(500).json({ msg: 'Erro inesperado' });
    }
};

exports.obterTarefa = async (req, res) => {
    try {
        const tarefa = await Tarefa.findById(req.params.id);
        if (!tarefa) return res.status(404).json({ msg: 'Tarefa não encontrada' });
        res.json(tarefa);
    } catch (err) {
        if (err.kind === 'ObjectId') return res.status(400).json({ msg: 'ID inválido' });
        res.status(500).json({ msg: 'Erro inesperado' });
    }
};

exports.criarTarefa = async (req, res) => {
    try {
        const { nome } = req.body;
        const novaTarefa = new Tarefa({ nome });
        await novaTarefa.save();
        res.status(201).json(novaTarefa);
    } catch (err) {
        res.status(500).json({ msg: 'Erro inesperado' });
    }
};

exports.atualizarTarefa = async (req, res) => {
    try {
        const { nome, concluida } = req.body;
        const tarefa = await Tarefa.findByIdAndUpdate(
            req.params.id,
            { nome, concluida },
            { new: true, runValidators: true }
        );

        if (!tarefa) return res.status(404).json({ msg: 'Tarefa não encontrada' });
        res.json(tarefa);
    } catch (err) {
        if (err.kind === 'ObjectId') return res.status(400).json({ msg: 'ID inválido' });
        res.status(500).json({ msg: 'Erro inesperado' });
    }
};

exports.deletarTarefa = async (req, res) => {
    try {
        const tarefa = await Tarefa.findByIdAndDelete(req.params.id);
        if (!tarefa) return res.status(404).json({ msg: 'Tarefa não encontrada' });
        res.status(204).send();
    } catch (err) {
        if (err.kind === 'ObjectId') return res.status(400).json({ msg: 'ID inválido' });
        res.status(500).json({ msg: 'Erro inesperado' });
    }
};