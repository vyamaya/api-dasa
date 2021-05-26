const mongoose = require('../infra/mongodb')
const Lab = require('../models/labSchema')

const getActive = (req, res) => {

    Lab.find({'status': 'ativo'}).then((Lab)=>{
        res.status(200).send(Lab)
    }).catch((err)=>{
        res.status(500).send({
            message: err.message
        })
    })
}

const getById = (req, res) => {
    Lab.findById({_id: req.params.id}).then((Lab)=>{
        if(Lab){res.status(200).send(Lab)}
        else{res.status(404).send({
            message: 'Laboratório não encontrado'
        })} 
    }).catch((err)=>{
        res.status(500).send({
            message: err.message
        })
    })
}

const insert = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Campos obrigatórios não podem estar vazios'
        })
    }
    const lab = new Lab(req.body)
    lab.save().then(()=>{
        res.status(201).send({
            message: 'Laboratório cadastrado com sucesso!'
        })
    }).catch((err)=>{
        res.status(500).send({
            message: err.message
        })
    })
}

const update = (req, res) => {
    let lab = req.body

    if (!lab._id) {
        return res.status(400).send({
            message: 'id é necessário'
        })
    }
    Lab.updateOne({
        _id: lab._id
    }, lab).then(value => {
        res.status(200).send({
            message: 'Laboratório atualizado com sucesso'
        })
    }).catch((err) => {
        res.status(500).send({
            message: 'Algo inesperado aconteceu ao atualizar o laboratório'
        })
    })
}

const deleteById = (req, res) => {
    let lab = req.body

    if (!lab._id) {
        return res.status(400).send({
            message: 'id é necessário'
        })
    }
    Lab.deleteOne({
            _id: lab._id
        })
        .then(deleted => {
            res.status(200).send({
                message: 'Laboratório deletado com sucesso'
            }).catch((err) => {
                res.status(500).send({
                    message: 'Algo inesperado aconteceu ao deletar o laboratório'
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