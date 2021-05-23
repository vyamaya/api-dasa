const Exam = require('../models/examSchema')

const getActive = (req, res) => {

    Exam.find({'status': 'ativo'}, (err, Exam) => {
        if (err) return res.status(500).send({
            message: 'Algo inesperado aconteceu no servidor'
        })
        if (Exam) {
            res.status(200).send(Exam)
        } else {
            res.status(404).send({
                message: 'Nenhum laboratório cadastrado'
            })
        }
    })
}

module.exports = {
    getActive
}