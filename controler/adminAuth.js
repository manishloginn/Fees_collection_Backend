const adminSchema = require("../model/adminSchema");
const { validateDetail } = require("../utils/validateDetail");
const JWT = require('jsonwebtoken')

const adminRegistration = async (req, res) => {


    const {userName, email, password} = req.body;

    try {

        await validateDetail({userName, email, password})
        const newAdmin = new adminSchema({
            userName, 
            email, 
            password
        })

        newAdmin.save()
        res.status(200).json({message: 'admin registered successfully'})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



const adminLogin = async (req, res) => {

    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: "Please fill all details",
        });
    }

    try {

        let admin = await adminSchema.findOne({
            $or : [
                {email : username},
                {userName : username}
            ]
        })

        // console.log(admin)

        if(!admin){
            return res.status(404).json({
                message: "User not found",
            })
        }

        if(admin.password !== password){
            return res.status(401).json({
                message: "Password not match",
            })
        }

        const token = JWT.sign(
            {id:admin._id , email:admin.email, role:"Admin"},
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )


        res.cookie('adminToken',  token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'Strict', 
            maxAge: 3600000, 
        })

        return res.status(200).json({
            message:"Login successful",
            data:token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}

module.exports = {adminRegistration, adminLogin}