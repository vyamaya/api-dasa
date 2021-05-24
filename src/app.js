const express = require('express')
const mongoose = require('./infra/mongodb')

const app = express()

app.use(express.json())
app.use('/', require('./route/labRoute'))
app.use('/', require('./route/examRoute'))

module.exports = app