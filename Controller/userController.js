const User = require('../Models/usermodel.js');
const jwt = require('jsonwebtoken');
const authController = require('./authController.js');

const signToken = id => {
    return jwt.sign( { id } , process.env.JWT_SECRET, {
        "expiresIn" : process.env.JWT_EXPIRES_IN
    });
}

exports.signup = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
    
        const token = signToken(newUser._id)

        res.status(201).json({
            status : 'Success',
            token,
            data : {
                user : newUser
            }
        })

    } catch (error) {
        res.status(500).json({
            status : 'fail',
            message : error.message
        })
    }
}

exports.login = async(req, res) => {

    const {email , password} = req.body

    if(!email || !password) {
        res.status(400).json({
            status : 'fail',
            message : "Please provide email and password"
        })
    }

    const user = await User.findOne( {email} ).select("+password");
    // console.log(user);
    

    if(email && (!(await user.correctPassword(password , user.password)))){
        res.status(404).json({
            status : 'fail',
            message : 'Password is incorrect'
        })
    }

    const token = signToken(user);

    res.status(200).json({
        status : "Success",
        message : "User login Successfully!!",
        token
    }) 
}

exports.deleteUser = async(req, res) => {

}


exports.getAllUsers = async(req, res) => {
    const users = await User.find();

    res.status(200).json({
        status : "Success",
        results : users.length,
        data : {
            users
        }
    })
}