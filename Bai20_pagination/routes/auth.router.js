const express = require('express')
const router = express.Router(); //trả về 1 router object
const controller = require('../controllers/auth.controller');

router.get('/login', controller.login);
router.post('/login', controller.postLogin);

module.exports = router;