const Lab = require ('../models/labSchema')

const getActive = (req, res) => {

    Lab.find({'status': 'ativo'}, (err, Lab) => {
        if (err) return res.status(500).send({
            message: 'Algo inesperado aconteceu no servidor'
        })
        if (Lab) {
            res.status(200).send(Lab)
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
    const lab = new Lab(req.body)
    lab.save(lab, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message
            })
        else res.status(201).send(data)
    })
}

module.exports = {
    getActive,
    insert
}