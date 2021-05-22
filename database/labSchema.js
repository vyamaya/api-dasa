const mongoose = require('../src/infra/mongodb')

const LabSchema = mongoose.Schema({
    nome: {
        type: String
    },
    endereco: {
        type: String
    },
    status: {
        type: String,
        enum: ['ativo', 'inativo'],
        defaut: 'ativo',
        required: true
    },
    exame: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'exams'
    }]
})

mongoose.model('labs', LabSchema)

const Lab = mongoose.model('labs')

module.exports = Lab