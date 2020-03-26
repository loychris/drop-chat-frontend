const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(req, res) {
    res.send('<h1>Hello Wolrd</h1>')
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('chat message', function(msg){
        console.log('message', msg);
        io.emit('chat message', msg);
    })
});

http.listen(3001, function (){
    console.log('listening on *:3001');
});