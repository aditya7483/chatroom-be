const express = require('express');
var http = require('http').Server(express);
const router = express.Router();
const Mess = require('../database/schemas/message.js');
var cors = require('cors')
var io = require('socket.io')();

router.use(cors())

router.get('/', (req, res) => {
  res.send('yes')
})

module.exports = router;
