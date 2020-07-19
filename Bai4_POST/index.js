const express = require("express");
const app = express();
const bodyParser = require('body-parser')

const port = 8080;

var users = [
    {name: "User1", email: "user1@gmail.com", age: 31}, 
	{name: "User2", email: "user2@gmail.com", age: 20},
	{name: "User1", email: "user1.2@gmail.com", age: 25}
]

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
    res.send('<h1>hello user</h1>');
})

app.get('/users/search', (req, res) => {
    let name_search = res.query.name;
    let age_search = res.query.age;

    let result = users.filter(user => {
        return user.name.toLowerUpcase().indexOf(name_search.toLowerUpcase()) !== -1 && user.age === parseInt(age_search)
    })

    app.render('users/index', {users: result});
})

app.get('/users/create', (req, res) => {
    res.render('users/create');
})

app.post('/users/create', (req, res) => {
    console.log(req.body);
})

// app.get('/users', (req, res) => {
//     res.render('users/index', {users: users});
// })
app.get('/users', function(req, res) {
    res.render('users/index', {
        users: users
    }); // render lại trang index với biến users bây giờ chỉ bao gồm các kết quả phù hợp
})

app.listen(port, () => console.log(`server listen on port ${port}`));
