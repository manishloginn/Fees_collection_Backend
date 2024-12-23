const schoolSchema = require("../model/schoolSchema");
const studentSchema = require("../model/studentSchema");
const JWT = require('jsonwebtoken')

const addSchool = async (req, res) => {
    const {name, address, contact_email, contact_number} = req.body;

    if(!name, !address, !contact_email, !contact_number){
        return res.status(400).json({
            message: "Please fill all details",
        })
    }


    try {
        
        const allreaddyAdd = await schoolSchema.findOne({name:name})

        if(allreaddyAdd){
            return res.status(500).json({
                message:"school allreaddy add"
            })
        }

        const newSchool = new schoolSchema({
            name, 
            address, 
            contact_email, 
            contact_number
        })

        await newSchool.save()

        res.status(200).json({
            message:"School add successfully",
            data:newSchool
        })

    } catch (error) {
         console.log("Error during login:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}


const addStudent = async (req, res) => {
    const {student_id, name, school_id, email, password} = req.body;

    
    if (!student_id || !name || !school_id || !email || !password) {
        return res.status(400).json({
            message: "Please fill all details",
        });
    }

    try {
        const newStudent = new studentSchema({
            student_id, 
            name, 
            school_id,
            email, 
            password
        })

        await newStudent.save()
        const populateData = await studentSchema.findById(newStudent._id).populate('school_id')

        return res.status(200).json({
            message:"Student create successfully",
            data:populateData
        })
    } catch (error) {
        console.log( error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }


}


const studentLongin = async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Please fill all details",
        });
    }

    try {
        const studentfind = await studentSchema.findOne({email})
        if(!studentfind){
            return res.status(404).json({
                message:"student not found"
            })
        }

        let match = studentfind.password === password

        if(!match) {
            return res.status(500).json({
                message:"password not match"
            })
        }

        const token = JWT.sign(
            {id:studentfind._id, email:studentfind.email, role:"Student"},
            process.env.JWT_SECRET,
            {expiresIn:"1h"}
        )

        res.cookie( 'studentToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'Strict', 
            maxAge: 3600000, 
        })

        return res.status(200).json({
            message:"login success",
            data:token
        })
        
    } catch (error) {
        
    }


}

module.exports = {addSchool, addStudent, studentLongin}