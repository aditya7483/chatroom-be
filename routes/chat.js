const express = require('express');
const router = express.Router();
const Item = require('../database/schemas/item');
const User = require('../database/schemas/user');
const authorize = require('../middleware/authorize')
var cors = require('cors')

router.use(cors())

//authorization required(auth-token needed as the header)
//endpoint to get all the notes a particular user
router.get('/getItems', async (req, res) => {
  try {
    let data = await Item.find();
    res.json(data);
  }
  catch (error) {
    res.status(404).send('internal server error')
  }
})

router.post("/createItem", async (req, res) => {
  try {
    let data = {
      email: req.body.email,
      title: req.body.title,
      description: req.body.description
    }
    let result = await Item.create(data);
    if (result.length === 0) {
      res.send("An error Occured");
    }
    else res.json(result);
  } catch (err) {
    res.status(404).send("Internal Server Error")
  }
});


//authorization required(auth-token needed as the header)
//endpoint to delete notes
router.delete('/deleteNote/:id', authorize, async (req, res) => {
  try {
    let userInfo = await User.findById(req.user.id)
    if (!userInfo) {
      res.status(404).send('user not found')
    }

    else {
      let note = await Item.findByIdAndDelete(req.params.id)
      res.json(note);
    }
  } catch (error) {
    res.status(404).send("Internal Server Error")
  }
})



module.exports = router;
