const mongoose = require ('../infra/mongodb')

const ExamSchema = new mongoose.Schema({
    nome: {
        type: String
    },
    tipo: {
        type: String,
        enum: ['analise clinica', 'imagem'],
        required: true
    },
    status: {
        type: String,
        enum: ['ativo', 'inativo'],
        defaut: 'ativo',
        required: true
    },
    laboratorio: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: ['labs']
    }]
})

mongoose.model('exams', ExamSchema)
const Exam = mongoose.model('exams')

module.exports = Exam