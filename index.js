const express = require('express');
var cors = require('cors')
const connectToMongo = require('./database/mongoose');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const Mess = require('./database/schemas/message');
const io = new Server(server, {
  cors: {
    origin: `http://localhost:3000`,
    methods: ['GET', 'POST']
  }
});
const port = process.env.PORT || 3001;

app.use(cors())

connectToMongo();

app.use(express.json());
app.use('/api/auth', require('./routes/auth'))
app.use('/api/chat', require('./routes/chat'))

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('messageSent', (data) => {
    Mess.create(
      {
        to: data.to,
        from: data.from,
        message: data.message
      }
    ).then(res => {
      io.emit('messageRecieve', res)
    })
      .catch(err => {
        console.log('message error')
        io.emit('messageError', err)
      })

  })
});

server.listen(port, function () {
  console.log('listening on *:' + port);
});
