const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('index');    // 확장자 생략 가능
});

router.get('/about', function(req, res) {
    res.render('about');    // 확장자 생략 가능
});

module.exports = router;