const mongoose = require('mongoose')

mongoose.set('debug', true)
mongoose.Promise = global.Promise

mongoose.connect(
    'mongodb://127.0.0.1:27017/capstone'
    )

module.exports.Student = require('./user')