const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const testingSchema = new Schema({
    _id: reqString,
    testing: reqString
})

const name = 'testing'

module.exports = mongoose.models[name]