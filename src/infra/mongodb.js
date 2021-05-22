const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/dasa').then(() => {
    console.log('Connect to database')
}).catch((err) => {
    console.log('Error to connect: ' + err)
})

module.exports = mongoose