const Vendor = require('./../Models/vendormodel.js'); 


exports.signup = async (req, res) => {
    try {
        const vendor = await Vendor.create(req.body);
    
        res.status(200).json({
            message : "Vendors Registred Succesfully",
            data : {
                data : vendor
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status  : "Fail",
            message : error.message
        })
    }
}

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body
    
        if(!email || !password){
            res.status(400).json({
                status : 'fail',
                message : "please provide your vaild email and password",
            })
        }
    
        const vendor = await Vendor.findOne({email}).select('+password');

        if (!email && (await vendor.correctPassword(password, vendor.password))) {
            res.status(401).json({
                message : "Please Enter correct password"
            })
        }
    
        res.status(200).json({
            status : "User logged In Successfully",
            data : {
                data : vendor
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status : "fail",
            message : error.message
        })
    }
}