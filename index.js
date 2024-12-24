const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const cookieParser = require('cookie-parser');

const connectDB = require('./mongoconnection/mongoConnect.js');
app.use(express.json());

const routes = require('./routes/router.js')



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(cors())
app.use(cors({
    origin: 'http://localhost:5173',  // Your frontend URL
    credentials: true,  // Allow cookies to be sent
}));

connectDB()

const PORT = 5000;
const MODE = process.env.NODE_ENV || "production"


app.use('/', routes)





app.listen(PORT, () => {
    console.log(`${PORT} is running on ${MODE} mode`)
})