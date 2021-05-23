const express = require('express')
const examController = require('../controller/examController')
const examRouter = express.Router()

examRouter.get('/exames', examController.getActive)
examRouter.post('/exames', examController.insert)
examRouter.put('/exames', examController.update)
examRouter.delete('/exames', examController.deleteById)

module.exports = examRouter