const mongoose = require('mongoose')
const Schema = mongoose.Schema

const collect_request = new Schema( {
    school_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"schoolSchema",
        required:true
    },
    trustee_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'studentSchema',
        required:true
    },
    gateway: {
        type:String,
        required:true
    },
    order_amount : {
        type:Number,
        required:true
    },
    custom_order_id : {
        type:String,
        required:true
    }
})

module.exports = mongoose.model('collect_request', collect_request)
