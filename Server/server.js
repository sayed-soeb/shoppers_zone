// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = 3001;
require('dotenv').config();
// Connect to MongoDB
mongoose.connect(process.env.DbUrl, {
  useNewUrlParser:true,
useUnifiedTopology: true,
});

// Create a user schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

// Create a User model
const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());
app.use(
  session({
    secret: 'yourSecretKey',
    resave: true,
    saveUninitialized: true,
  })
);

// Signup endpoint
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Save the user data in the session
    req.session.user = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };

    res.json({ message: 'Login successful', user: req.session.user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Logout endpoint
app.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logout successful' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
