const express = require('express');
const app = express();
const router = express.Router();
var cors = require('cors');
const fetchUser = require('../middleware/authorize.js');
const Mess = require('../database/schemas/message.js');

router.use(cors())
let messages = [];

router.post('/getTexts', fetchUser, async (req, res) => {
  try {
    let from = req.body.from
    let to = req.body.to
    messages = await (Mess.find(
      {
        "from": { "$in": [from, to] },
        "to": { "$in": [from, to] }
      }
    )).sort({ KEY: -1 });

    res.json({ data: messages })
  } catch (err) {
    res.status(501).json({ err: 'Internal Server Error' })
  }
})




module.exports = router;
