const mongoose = require('mongoose');

const TarefaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    concluida: { type: Boolean, default: false }
}, {
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

module.exports = mongoose.model('Tarefa', TarefaSchema);