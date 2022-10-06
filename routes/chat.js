const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: `http://localhost:3000`,
    methods: ['GET', 'POST']
  }
});
const router = express.Router();
const Mess = require('../database/schemas/message.js');
var cors = require('cors');
const fetchUser = require('../middleware/authorize.js');

router.use(cors())
let messages = [];

router.post('/getTexts', fetchUser, async (req, res) => {
  try {
    let from = req.body.from
    let to = req.body.to
    messages = await (Mess.find({ from: from, to: to })).limit(100).sort({ KEY: -1 });

    res.json({ data: messages })
  } catch (err) {
    res.status(501).json({ err: 'Internal Server Error' })
  }
})

io.on('messageSent', async (mess) => {
  try {
    let response = await Mess.create(mess)
    io.emit('messageRecieved', messages)
  } catch (err) {
    io.emit('messageError', err)
  }
})

module.exports = router;
