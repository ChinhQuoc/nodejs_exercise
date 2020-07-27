const express = require('express');
const router = express.Router(); //trả về 1 router object
const controller = require('../controllers/product.controller');

router.get('/', controller.products);

module.exports = router;