const express = require("express");

const router = express.Router();
const userController = require('../controlllers/UserController');
const bankController = require('../controlllers/BankController');
const addfundController = require('../controlllers/AddfundsController');
const withdrawfundsController = require('../controlllers/WithdrawFundsController');
const transferLogsController = require('../controlllers/TransferLogsController');

router.get('/one', (req, res) => {
    res.status(200).json({ message: 'Connected!' });
});

router.get('/getusers', (req, res) => {
    userController.getUsers(req, res);
});

router.get('/user/getuserid/:email', (req, res) => {
    userController.getUserId(req, res);
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

router.post('/user/logout', (req, res) => {
    userController.logout(req, res);
});

router.post('/user/generateotp', (req, res) => {
    userController.generateOTP(req, res);
});

router.post('/user/verifyotp', (req, res) => {
    userController.verifyOtp(req, res);
});

router.post('/fund/addbank', (req, res) => {
    bankController.addBank(req, res);
});

router.get('/fund/getbanks/:userId', (req, res) => {
    bankController.fetchBanks(req, res);
});

router.put('/fund/addfunds', (req, res) => {
    addfundController.addFunds(req, res);
});

router.put('/fund/withdrawfunds', (req, res) => {
    withdrawfundsController.withdrawfunds(req, res);
});

router.get('/fund/pendinglogs/:userId', (req, res) => {
    transferLogsController.pendingLogs(req,res);
});

router.get('/fund/transferlogs/:userId', (req, res) => {
    transferLogsController.transferLogs(req,res);
});

router.put('/fund/cancelpayment', (req, res) => {
    transferLogsController.cancelPayment(req,res);
});

module.exports = router;