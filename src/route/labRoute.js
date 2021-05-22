const express = require('express')
const labController = require('../controller/labController')
const labRouter = express.Router()

labRouter.get('/laboratorios', labController.getActive)

module.exports = labRouter