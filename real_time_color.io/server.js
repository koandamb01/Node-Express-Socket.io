const express = require('express');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

const server = app.listen(8080);
const io = require('socket.io')(server);

// create a grobal variable
var color;

// render index for the root
app.get('/', function (req, res) {
    res.render('index', { color: color });
});

// Start socket connection
io.on('connection', function (socket) {

    socket.on('change-color', function (data) {
        // change the value of color
        color = data.color;

        // emit color change to all users
        io.emit('change-color', { color: color });
    });
});