const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    }, 
    email : {
        type : String,
        required : true,
        validate : {
            validator : (value) => {
                return validator.isEmail(value)
            },
            message : "please enter a valid email"
        },
        unique : true
    },
    password : {
        type : String,
        required : [true, 'please enter Strong password'],
        minlength : 8,
        select : false
    },
    passwordConfirm : {
        type : String,
        required : [true , "Please Confirm your Password"],
        validate : {
            // this only works on create and save
            validator: function(el) {
                return el === this.password
            },
            message : 'Password do not match'
        }
    }
})

userSchema.pre("save" , async function(next)  {
    // only run this password if password is actualy modified 
    if(!this.isModified('password')) {
        return next()
    }

    // hash this password with the cost  of 12
    this.password = await bcrypt.hash(this.password , 12)

    this.passwordConfirm = undefined
    next();
})




userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    console.log("coming req",candidatePassword)
    console.log( await bcrypt.compare(candidatePassword,userPassword))
    return await bcrypt.compare(candidatePassword,userPassword)
}







const User = mongoose.model('User', userSchema);

// module.exports = User
module.exports = User;