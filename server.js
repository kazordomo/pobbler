const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/public');

app.get('*', (req, res) => res.sendFile(__dirname  + '/public/index.html'));

app.set('port', (process.env.PORT || 3000));

io.on('connection', socket => {

    socket.on('typing', () => io.emit('typing'));
    socket.on('is not typing', () => io.emit('is not typing'));
    socket.on('message', ({user, message}) => io.emit('message', { user, message }));

    // socket.on('disconnect', () => console.log('User disconnected.'));

});

http.listen(app.get('port'), () =>
    console.log(`Server is running on port ${app.get('port')}`));
