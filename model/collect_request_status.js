const mongoose = require('mongoose')
const Schema = mongoose.Schema

const collect_request_status = new Schema({
    collect_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "collect_request",
        required: true
    },
    status: {
        type: String,
        enum: ['Success', 'Pending', 'Decline'],
        default: "Success"
    },
    payment_method: {
        type: String,
        required: true
    },
    gateway: {
        type: String,
        required: true
    },
    transaction_amount: {
        type: String,
        required: true
    },
    bank_refrence: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('collect_request_status', collect_request_status)