const User = require('./../Models/usermodel.js');



exports.signup = async () => {

    const user = await User.create(req.body);

    res.status(200).json({
        message : 'User Signup Successfully',
        data : {
            user 
        }
    })
}
