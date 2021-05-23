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

const insert = (req, res) => {
    
    if (!req.body) {
        res.status(400).send({
            message: 'Campos obrigatórios não podem estar vazios'
        })
    }
    const exam = new Exam(req.body)
    exam.save(exam, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message
            })
        else res.send(data)
    })
}

const update = (req, res) => {
    let exam = req.body

    if (!exam._id) {
        return res.status(400).send({
            message: 'id é necessário'
        })
    }
    Exam.updateOne({_id: exam._id}, exam).then(value => {
        res.status(200).send({
            message: 'Exame atualizado com sucesso'
        }).catch((err) => {
            res.status(500).send({
                message: 'Algo inesperado aconteceu ao atualizar o exame'
            })
        })
    })
}

const deleteById = (req, res) => {
    let exam = req.body

    if (!exam._id) {
        return res.status(400).send({
            message: 'id é necessário'
        })
    }
    Exam.deleteOne({
            _id: exam._id
        })
        .then(deleted => {
            res.status(200).send({
                message: 'Exame deletado com sucesso'
            }).catch((err) => {
                res.status(500).send({
                    message: 'Algo inesperado aconteceu ao deletar o exame'
                })
            })
        })
}

module.exports = {
    getActive,
    insert,
    update,
    deleteById
}