const express = require('express');
const multer  = require('multer');

const router = express.Router(); //trả về 1 router object
const controller = require('../controllers/user.controller');
const validate = require('../validate/user.validate');
const authMiddle = require('../middlewares/auth.middleware');

var upload = multer({ dest: './public/uploads/' });

router.get('/', authMiddle.requireAuth, controller.index);

router.get('/cookie', (req, res) => {
    res.cookie('user-id', 12345);
    res.send('hello');
});

router.get('/create', controller.create);

router.get('/search', controller.search);

// nói cho func biết là ta sẽ upload 1 file đơn lẻ, tên avatar phải trùng vs field trong input 
router.post('/create', upload.single('avatar'), validate.createUser, controller.createUser);

router.get('/:id', controller.get);

module.exports = router;