const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jobadd = require('./routes/job')
const user = require('./routes/user')
const cors = require('cors')


dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(cors({ origin: 'https://job-listing-kc08pt9dc-dheeshetty.vercel.app/', methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
preflightContinue: false,
optionsSuccessStatus: 204, }));

app.use(express.static('./public'));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/', (req, res) => {
  res.json({ status: 'active', service: 'Job listing backend' });
});

app.use(user);
app.use(jobadd);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
