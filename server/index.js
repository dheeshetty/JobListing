const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./public'))

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.json({ status: 'active', service: 'Job listing backend', time: new Data()})
  })

  app.listen(process.env.PORT, () => {
    mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => console.log(`Server running on http://localhost:${process.env.PORT}`))
      .catch(error => console.log(error));
  })
  