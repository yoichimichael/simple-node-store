// core module
const path = require('path');

const express = require('express');

const rootDir = require('../helpers/path');

const router = express.Router();

router.get('/', (req, res, next) => {
  // res.send('<h1>Hello from Express.js!</h1>')// auto sets 'Content-Type: text/html; charset=utf-8' in headers
  res.sendFile(path.join(rootDir, '../', 'views', 'shop.html'));
});

module.exports = router;