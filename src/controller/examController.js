const Exam = require('../models/examSchema')
const mongoose = require('../infra/mongodb')
const { populate } = require('../models/examSchema')

const getActive = (req, res) => {

    Exam.find({'status': 'ativo'}).populate('labs').then((Exam)=>{
        res.status(200).send(Exam)
    }).catch((err)=>{
        res.status(500).send({
            message: err.message
        })
    })
}

const getById = (req, res) => {
    Exam.findById({_id: req.params.id}).then((Exam)=>{
        if(Exam){res.status(200).send(Exam)}
        else{res.status(404).send({
            message: 'Exame não encontrado'
        })} 
    }).catch((err)=>{
        res.status(500).send({
            message: err.message
        })
    })
}

const insert = (req, res) => {
    
    if (!req.body.tipo) {
        res.status(400).send({
            message: 'Campos obrigatórios não podem estar vazios'
        })
    }
    const exam = new Exam(req.body)
    exam.save().then(()=>{
        res.status(201).send({
            message: 'Exame cadastrado com sucesso!'
        })
    }).catch((err)=>{
        res.status(500).send({
            message: err.message
        })
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
    getById,
    insert,
    update,
    deleteById
}