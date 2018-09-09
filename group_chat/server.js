const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

const server = app.listen(8080);
const io = require('socket.io')(server);

var chats = [];

// render the root page
app.get('/', function(req, res) {
    res.render('index');
});


// Start socket connection
io.on('connection', function(socket) {

    socket.on('add_user', function(data) {

        // send socket respond to all users to the chat room
        socket.emit('chat_room', { chats: chats });
    });


    // socket received message
    socket.on('send_message', function(data) {
        // push message the list
        var tempData = {
            userName: data.userName,
            message: data.message.replace(/<[^>]+>/g, '')
        }
        chats.push(tempData);

        // send socket respond to all users to the chat room
        io.emit('add_message', { chats: [tempData] });
    });
});