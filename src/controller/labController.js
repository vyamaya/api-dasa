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

module.exports = {
    getActive
}