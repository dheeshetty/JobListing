const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();


dotenv.config();

const app = express();


const User = mongoose.model('User', {
  Name: String,
  Email: String,
  Mobile: Number,
  Password: String,
});


router.post('/register', async (req, res) => {
  try {
    const { Name, Email, Mobile, Password } = req.body;

    // Check for required fields
    if (!Name || !Email || !Mobile || !Password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password
    const encryptedPass = await bcrypt.hash(Password, 10);

    // Create a new user
    const newUser = new User({ Name, Email, Mobile, Password: encryptedPass });
    await newUser.save();

    // Generate a JWT token
    const jwtToken = jwt.sign({ userId: newUser._id, email: newUser.Email }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Set an appropriate expiration time
    });


    res.status(200).json({ message: 'Registered successfully', jwtToken: jwtToken,
    recruiterName: newUser.Name, // Include the recruiter's name in the response
  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return res.status(400).json({ message: 'Email and Password are required' });
    }

    // Find the user by email
    const user = await User.findOne({ Email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the stored hash
    const passwordMatch = await bcrypt.compare(Password, user.Password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const jwtToken = jwt.sign({ userId: user._id, email: user.Email }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Set an appropriate expiration time
    });


    res.status(200).json({ status: 'SUCCESS',
     message: `${user.Name} logged in successfully`, jwtToken , 
      recruiterName: user.Name, // Include the recruiter's name in the response
     });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err); // Log the error for debugging purposes
  res.status(500).json({ message: 'Something went wrong! Please try again later.' });
});


module.exports = router;
