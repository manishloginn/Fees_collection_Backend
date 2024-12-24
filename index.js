const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const connectDB = require('./mongoconnection/mongoConnect.js');


app.use(cookieParser());
app.use(cors({
    // origin: 'http://localhost:5173', 
    origin: 'https://fees-collection-frontend.vercel.app', 
    credentials: true,              
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const routes = require('./routes/router.js');
app.use('/', routes);


connectDB();


const PORT = 5000;
const MODE = process.env.NODE_ENV || "production";

app.listen(PORT, () => {
    console.log(`${PORT} is running on ${MODE} mode`);
});
