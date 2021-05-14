const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  // console.log('I should not be running run!');
  res.send('<h1>Hello from Express.js!</h1>')// auto sets 'Content-Type: text/html; charset=utf-8' in headers
});

module.exports = router;