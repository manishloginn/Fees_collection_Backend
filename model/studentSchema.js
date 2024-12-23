const { Schema, mongo, default: mongoose } = require("mongoose");

const studentSchema = new Schema({
    student_id:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    school_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"schoolSchema",
        required:true
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('studentSchema', studentSchema)