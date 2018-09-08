const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
// Set up views
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


// setup socket.io
const server = app.listen(8080);
const io = require('socket.io')(server);

var counter = 0; // Global variable

// render the root index home page
app.get('/', function (req, res) {
    res.render('index', { counter: counter });
});

// start socket
io.on('connection', function (socket) {

    // get on socket res
    socket.on('update', function () {
        counter++; // increment counter
        // send back the socket response
        io.emit('update', { counter: counter });
    });

    // socket req
    socket.on('reset', function () {
        counter = 0; // increment counter
        // send back the socket response
        io.emit('update', { counter: counter });
    });

    // io.emit => to send to everyone *** but *** socket.emit to send the user that request
});