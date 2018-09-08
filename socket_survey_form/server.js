const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

// ************* START SETTING UP APP *************** //
const app = express();
app.use(bodyParser.urlencoded({ extends: true }));
app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'ejs');

const server = app.listen(8000);
const io = require('socket.io')(server);
// *************** FINISHED APP SETTING UP *************** //

// Render the root views
app.get('/', function (req, res) {
    res.render('index');
});

// start listen/emit with socket
io.on('connection', function (socket) {

    socket.on('posting_form', function (data) {
        console.log('Form data Received: ', data);

        // make an socket emit back to the client
        socket.emit('updated_message', data);

        // make a random number and make a socket.io emit
        const number = Math.floor(Math.random() * 1000) + 1;
        socket.emit('random_number', { number: number });
    });
});