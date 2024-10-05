const express = require('express')
const app = express();
const rateLimit = require('express-rate-limit')
const userRouter = require('./routes/userRoutes.js');
const vendorRouter = require('./routes/vendorRoutes.js')
const morgan = require('morgan');



app.use(express.json());

app.use(morgan('dev'));



app.get("/" , (req, res) => {
    res.send("Hello from the sever side 👋, hey Sidhant")
})

const limiter = rateLimit({
    max : 10,
    windowMs : 60 * 60 * 100,
    message : 'To many Request from this IP , Please try again in an hour'
});

app.use('/api', limiter)

app.use('/api/v1/users', userRouter)
app.use('/api/v1/vendors', vendorRouter)

app.all('*' , (req, res, next) => {
    res.status(404).json({
        status : 'fail',
        message : `Can't find ${req.originalUrl} on this server`
    })
})

module.exports = app;