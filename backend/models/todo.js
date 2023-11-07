// Import necessary modules
const mongoose = require('mongoose');

// Define the Todo schema
const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  timestamp: {
    type: Date,
    default: Date.now, // Automatically set the timestamp to the current date and time
  }
});

// Create and export the Todo model
module.exports = mongoose.model('Todo', todoSchema);
