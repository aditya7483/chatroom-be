const express = require('express');
var cors = require('cors')
const app = express();
const port = process.env.PORT || 3001;
const connectToMongo = require('./database/mongoose');

app.use(cors())

connectToMongo();

app.use(express.json());
app.use('/api/auth', require('./routes/auth'))
app.use('/api/chat', require('./routes/chat'))


app.listen(port, (err) => {
  if (err) console.log(err);
  console.log("Server listening on PORT", port);
});