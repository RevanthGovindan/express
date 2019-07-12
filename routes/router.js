const express = require("express");

const router = express.Router();
const userController = require('../controlllers/UserController');
router.get('/one', (req, res) => {
    console.log((req.body));
    res.status(200).json({ message: 'Connected!' });
});

router.post('/user/adduser', (req, res) => {
    userController.addUser(req, res);
});

router.post('/user/login', (req, res) => {
    userController.login(req, res);
})

module.exports = router;