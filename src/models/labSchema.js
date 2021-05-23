const mongoose = require('../infra/mongodb')

const LabSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true
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
})

mongoose.model('labs', LabSchema)

const Lab = mongoose.model('labs')

module.exports = Lab