const express = require('express')
const mongoose = require('./infra/mongodb')

const app = express()

app.use(express.json())
app.use('/', require('./route/labRoute'))


app.listen(3000, () => {
    console.log('server running at port 3000')
})


module.exports = app