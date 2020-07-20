var db = require('../db');
const shortid = require('shortid');

module.exports.index = (req, res) => {
    res.render('users/index', {
        users: db.get('users').value()
    })
};

module.exports.search = (req, res) => {
    let name_search = req.query.name;
    let age_search = req.query.age;

    let result = db.get('users').value().filter(user => {
        return user.name.toLowerCase().indexOf(name_search.toLowerCase()) !== -1 && user.age === age_search;
    })
    res.render("users/index", {
        users: result,
        name: req.query.name,
        age: req.query.age
    });
};

module.exports.get = (req, res) => {
    let id = req.params.id;
    let user = db.get('users').find({ id: id }).value();

    res.render('users/view', {
        user: user
    })
};

module.exports.create = (req, res) => {
    res.render('users/create');
};

module.exports.createUser = (req, res) => {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
};