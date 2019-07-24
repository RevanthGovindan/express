const express = require("express");

const router = express.Router();
const userController = require('../controlllers/UserController');
const bankController = require('../controlllers/BankController');


router.get('/one', (req, res) => {
    res.status(200).json({ message: 'Connected!' });
});

router.post('/addbanks', (req, res) => {
    bankController.addBank(req,res);
});

router.get('/getusers', (req, res) => {
    userController.getUsers(req,res);
});

router.post('/user/adduser', (req, res) => {
    userController.addUser(req, res);
});

router.post('/user/updatepassword', (req, res) => {
    userController.updatePassword(req, res);
})

router.post('/user/login', (req, res) => {
    userController.login(req, res);
});

router.post('/user/generateotp', (req, res) => {
    userController.generateOTP(req, res);
});

router.post('/user/verifyotp', (req, res) => {
    userController.verifyOtp(req, res);
});

module.exports = router;