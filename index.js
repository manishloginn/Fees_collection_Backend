const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const connectDB = require('./mongoconnection/mongoConnect.js');
app.use(express.json());

const routes = require('./routes/router.js')



app.use(express.json())
app.use(cors())

connectDB()

const PORT = 5000;
const MODE = process.env.NODE_ENV || "production"


app.use('/', routes)





app.listen(PORT, () => {
    console.log(`${PORT} is running on ${MODE} mode`)
})