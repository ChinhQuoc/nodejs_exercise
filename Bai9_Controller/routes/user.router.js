var express = require('express')
var router = express.Router(); //trả về 1 router object
var controller = require('../controllers/user.controller')

router.get('/', controller.index);

router.get('/create', controller.create);

router.get('/search', controller.search);

router.post('/create', controller.createUser);

router.get('/:id', controller.get);

module.exports = router;