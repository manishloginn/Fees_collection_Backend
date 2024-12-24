const express = require('express')
const getData = require('../controler/getData')
const { adminRegistration, adminLogin } = require('../controler/adminAuth')
const { addSchool, addStudent, studentLongin } = require('../controler/addSchool')
const { studentPayment } = require('../controler/studentPayment')
const dashboardData = require('../controler/dashboardData')
const updateStatus = require('../controler/updateStatus')
const authenticateUser = require('../utils/authenticateUser')
const router = express.Router()


router.get('/', getData)
//admin registration and login
router.post('/admin/register', adminRegistration)
router.post('/admin/login', adminLogin)

//add school and student in website
router.post('/addschool', addSchool)

//student signup and login
router.post('/addstudent', addStudent)
router.post('/student/login', studentLongin)


//payment students
router.post('/payment/status',   updateStatus)
router.post('/student/payment', studentPayment)


router.get('/dashboardData', dashboardData )

module.exports = router

