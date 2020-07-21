const express = require('express')
const router = express.Router(); //trả về 1 router object
const controller = require('../controllers/user.controller');
const validate = require('../validate/user.validate');

router.get('/', controller.index);

router.get('/create', controller.create);

router.get('/search', controller.search);

router.post('/create',validate.createUser, controller.createUser);

router.get('/:id', controller.get);

module.exports = router;