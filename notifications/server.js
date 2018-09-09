const express = require('express');
const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

const server = app.listen(8080);
const io = require('socket.io')(server);


app.get('/', function (req, res) {
    res.render('index');
});

var socketIDs = [];
// Start server
io.on('connection', function (socket) {

    // received socket request
    socket.on('connect_me', function () {
        var data = {
            socketID: socket.id,
            notification: "joined us!"
        }
        socketIDs.push(data);

        // send socket notifation to all users
        io.emit('join-notifications', { socketIDs: socketIDs });
    });

    socket.on('notify-everyone', function () {
        var data = {
            socketID: socket.id,
            notification: "just trigged a notification!"
        }
        socketIDs.push(data);
        // send socket notifation to all users
        io.emit('join-notifications', { socketIDs: socketIDs });
    });
});