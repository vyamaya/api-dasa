const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb+srv://deploy:<password>@cluster0.divc9.mongodb.net/dasa')

module.exports = mongoose