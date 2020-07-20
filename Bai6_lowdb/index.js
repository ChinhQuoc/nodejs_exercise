const express = require("express");
const app = express();
const shortid = require('shortid');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const bodyParser = require('body-parser');

const port = 3000;

let name = '';
let age = '';

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] })
  .write();

app.get('/', (req, res) => {
    res.send('<h1>Hello</h1>')
})

app.get('/users', (req, res) => {
    res.render('users/index', {
        users: db.get('users').value(),
        name: this.name,
        age: this.age
    })
})

app.get('/users/create', (req, res) => {
    res.render('users/create');
})

app.get('/users/search', (req, res) => {
    let name_search = req.query.name;
    let age_search = req.query.age;

    let result = db.get('users').value().filter(user => {
        console.log("user");
        return user.name.toLowerCase().indexOf(name_search.toLowerCase()) !== -1 && user.age === age_search;
    })

    // let result = find(db.get('users'), {
    //     'name': name_search,
    //     'age': age_search
    // })

    res.render("users/index", {
        users: result,
        name: req.query.name,
        age: req.query.age
    });
})

app.post('/users/create', (req, res) => {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    console.log(db.get('users'));
    res.redirect('/users');
})

app.get('/users/:id', (req, res) => {
    let id = req.params.id;
    let user = db.get('users').find({ id: id }).value();

    res.render('users/view', {
        user: user
    })
})

app.listen(port, () => {
    console.log(`server listen on port ${port}`);
})