const express = require("express");

const router = express.Router();

router.get('/one', (req, res) => {
    console.log((req.body));
    res.status(200).json({ message: 'Connected!' });
});

router.get('/two', (req, res) => {
    res.status(200).json({ message: 'Connected!' });
});

module.exports = router;