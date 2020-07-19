// Template engines:
// Pug(jade)
// Mustache
// ejs

const express = require('express');
const app = express(); //express trả về 1 thằng app mới
const bodyParser = require('body-parser');

const port = 3000;

let name = '';
let age = '';

var users = [
    {name: "User1", email: "user1@gmail.com", age: 31}, 
	{name: "User2", email: "user2@gmail.com", age: 20},
	{name: "User1", email: "user1.2@gmail.com", age: 25}
]

app.set('view engine', 'pug');  // Sử dụng pug làm view engine
app.set('views', './views'); // Thư mục views nằm cùng cấp với file index.js

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', function(req, res) {
    res.send('<h1>this is my first app</h1>')
});

app.get('/users/search', (req, res) => {
    var name_search = req.query.name;
    var age_search = req.query.age;

    //result kiểm tra xem query tìm kiếm có nằm trong users không, nếu có > 0 nếu k < 0
    var result = users.filter(user => {
        // Lưu ý: Chuyển tên về cùng in thường hoặc cùng in hoa để không phân biệt hoa, thường khi tìm kiếm
        return user.name.toLowerCase().indexOf(name_search.toLowerCase()) !== -1 && user.age === parseInt(age_search);
    })

    res.render('users/index', {
        users: result,
        name: req.query.name,
        age: req.query.age
    })
})

app.get('/users', function(req, res) {
    res.render('users/index.pug', {
        users: users,
        name: name,
        age: age
    }); // render lại trang index với biến users bây giờ chỉ bao gồm các kết quả phù hợp
})

app.get('/users/create', (req, res) => {
    res.render('users/create');
})

app.post('/users/create', (req, res) => {
    users.push(req.body);
    res.redirect('/users');
})

app.listen(port, function() {
    console.log(`Server listenning on port ${port}`);
})