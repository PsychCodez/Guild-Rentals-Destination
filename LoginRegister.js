const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourDatabaseName', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a user schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Registration route
// Registration route
app.post('/register', async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      console.log('Received registration request:', { username, email, password });
  
      // Check if the username is already taken (case-insensitive)
      const existingUser = await User.findOne({ username: { $regex: new RegExp(username, 'i') } });
      if (existingUser) {
        console.log('Username already exists');
        return res.status(400).json({ success: false, message: 'Username already exists' });
      }
  
      // Create a new user
      const newUser = new User({ username, email, password });
  
      // Save the user to the database
      await newUser.save();
  
      console.log('User registered successfully:', newUser);
      // Send a JSON response indicating successful registration
      res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
      console.error('Registration error:', error);
      // Send a JSON response indicating registration failure
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });
  

// Login route
// Login route
app.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      console.log('Received login request:', { username, password });
  
      // Validate the username and password (you might want to enhance this validation)
      if (!username || !password) {
        console.log('Invalid username or password');
        return res.status(400).json({ success: false, message: 'Invalid username or password' });
      }
  
      // Check if the username and password match
      const user = await User.findOne({ username, password });
      if (!user) {
        console.log('Invalid username or password');
        return res.status(401).json({ success: false, message: 'Invalid username or password' });
      }
  
      console.log('Login successful:', user);
      // Send a JSON response indicating successful login
      res.status(200).json({ success: true, message: 'Login successful' });
    } catch (error) {
      console.error('Login error:', error);
      // Send a JSON response indicating login failure
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });
  