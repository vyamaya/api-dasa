const mongoose = require ('../infra/mongodb')
const Schema = mongoose.Schema

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
        type: Schema.Types.ObjectId,
        ref: 'labs',
        required: true
    }]
})

mongoose.model('exams', ExamSchema)
const Exam = mongoose.model('exams')

module.exports = Exam