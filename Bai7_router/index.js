const express = require("express");
const bodyParser = require('body-parser');

var userRouter = require('./routes/user.router');

const port = 3000;

const app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
    res.send('<h1>Hello</h1>')
})

app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`server listen on port ${port}`);
})