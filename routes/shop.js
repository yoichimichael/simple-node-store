const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  // res.send('<h1>Hello from Express.js!</h1>')// auto sets 'Content-Type: text/html; charset=utf-8' in headers
  res.sendFile('../views/shop.html');
});

module.exports = router;