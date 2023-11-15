// server.js

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import session from 'express-session';
import cors from 'cors';

const app = express();
const PORT = 3001;

import dotenv from 'dotenv';
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.DbUrl, {
  useNewUrlParser: true,
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

app.use(cors());
app.use(bodyParser.json());

app.use(
  session({
    secret: secret,
    resave: true,
    saveUninitialized: true,
  })
);

// Signup endpoint
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // ... (unchanged)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // ... (unchanged)
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
