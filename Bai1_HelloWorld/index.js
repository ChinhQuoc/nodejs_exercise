const express = require('express');
const app = express();

const port = 3000;

app.get('/', function(request, response) {
    response.send(`<h1>Hello</h1><a href="/user">User</a>`);
});

app.get('/user', function(request, response) {
    response.send('User hello');
})

app.listen(port, function() {
    console.log(`Server listenning on port ${port}`);
})
