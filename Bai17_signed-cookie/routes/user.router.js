const express = require('express')
const router = express.Router(); //trả về 1 router object
const controller = require('../controllers/user.controller');
const validate = require('../validate/user.validate');
const authMiddle = require('../middlewares/auth.middleware');

router.get('/', authMiddle.requireAuth, controller.index);

router.get('/cookie', (req, res) => {
    res.cookie('user-id', 12345);
    res.send('hello');
});

router.get('/create', controller.create);

router.get('/search', controller.search);

router.post('/create',validate.createUser, controller.createUser);

router.get('/:id', controller.get);

module.exports = router;