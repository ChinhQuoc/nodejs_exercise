require('dotenv').config();

const express = require("express");
const bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let userRouter = require('./routes/user.router');
let authRoute = require('./routes/auth.router');
let authMiddleware = require('./middlewares/auth.middleware');

const port = 3000;

const app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
})

app.use('/users', authMiddleware.requireAuth, userRouter);
app.use('/auth', authRoute);

app.listen(port, () => {
    console.log(`server listen on port ${port}`);
})