const dotenv= require('dotenv')
dotenv.config({path : './config.env'});
// const mongoose = require('mongoose')

// const express = require('express');
// const app = express();

const app = require('./App.js');
const mongoose  = require('mongoose');


const port = process.env.PORT || 4000

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(() => {
    console.log('DB Connection Successfully👍');
})



const sever = app.listen(port , () => {
    console.log(`Server Running on port ${port}`)
})