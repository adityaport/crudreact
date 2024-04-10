require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Use CORS to allow requests from your frontend domain
app.use(express.json()); // Body-parser middleware

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// MongoDB Model
const ItemSchema = new mongoose.Schema({
  name: String,
  location : String,
});
const Item = mongoose.model('Item', ItemSchema);

// Routes
// Get All Items
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a New Item
app.post('/items', async (req, res) => {
  const item = new Item({
    name: req.body.name,
    location: req.body.location,
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
