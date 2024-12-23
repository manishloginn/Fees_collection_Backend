const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schoolSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String },
    contact_email: { type: String, required: true },
    contact_number: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('schoolSchema', schoolSchema)