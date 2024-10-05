const express = require('express');
const vendorController = require('./../Controller/vendorController.js');

const router = express.Router();

router.post('/signup', vendorController.signup);
router.post('/login', vendorController.login);

module.exports = router