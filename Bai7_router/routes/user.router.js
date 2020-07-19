var express = require('express')
var router = express.Router(); //trả về 1 router object
const shortid = require('shortid');

var db = require('../db');

router.get('/', (req, res) => {
    res.render('users/index', {
        users: db.get('users').value()
    })
})

router.get('/create', (req, res) => {
    res.render('users/create');
})

router.get('/search', (req, res) => {
    let name_search = req.query.name;
    let age_search = req.query.age;
    console.log("name_search",name_search);
    console.log("age_search",age_search);

    let result = db.get('users').filter(user => {
        console.log("user");
        return user.name.toLowerCase().indexOf(name_search.toLowerCase()) !== -1 && user.age === age_search;
    })

    // let result = find(db.get('users'), {
    //     'name': name_search,
    //     'age': age_search
    // })

    console.log("result",result);
    res.render("users/index", {
        users: result,
        name: req.query.name,
        age: req.query.age
    });
})

router.post('/create', (req, res) => {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
})

router.get('/:id', (req, res) => {
    let id = req.params.id;
    let user = db.get('users').find({ id: id }).value();

    res.render('users/view', {
        user: user
    })
})

module.exports = router;