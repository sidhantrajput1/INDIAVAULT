const express = require('express')
const userController = require('./../Controller/usercontroller.js');

const router = express.Router();


router.post('/signup', userController.signup);
router.post('/login', userController.login);
// router.post('/getAllUsers', userController.getAllUsers);
router.get('/getAllUsers', userController.getAllUsers)

module.exports = router