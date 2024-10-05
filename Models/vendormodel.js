const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt');
const { validate } = require('./usermodel');

const vendorSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Vendor must have good name']
    },
    email : {
        type : String,
        required : [true, 'vendor must have a unique email address'],
        unique : true
    },
    password : {
        type : String,
        required : [true, "please enter strong password"],
        minlength : 8,
        select : false,
        validate : [validator.isEmail, 'Please provde your valid email']
    },
    passwordConfirm : {
        type : String,
        required : [true, "Please confirm your password"],
        validate : {
            validator : function(el) {
                return el === this.password
            }
        }
    }
});

vendorSchema.pre('save', async function (next)  {
    if(!this.isModified('password')) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;

    next();
})

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;