const express = require('express')
const labController = require('../controller/labController')
const labRouter = express.Router()

labRouter.get('/laboratorios', labController.getActive)
labRouter.post('/laboratorios', labController.insert)
labRouter.put('/laboratorios', labController.update)
labRouter.delete('/laboratorios', labController.deleteById)

module.exports = labRouter