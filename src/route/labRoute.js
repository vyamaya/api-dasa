const express = require('express')
const labController = require('../controller/labController')
const labRouter = express.Router()

labRouter.get('/laboratorios', labController.getActive)
labRouter.get('/laboratorios/:id', labController.getById)
labRouter.post('/laboratorios', labController.insert)
labRouter.put('/laboratorios', labController.update)
labRouter.delete('/laboratorios', labController.deleteById)

module.exports = labRouter