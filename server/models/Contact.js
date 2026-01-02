const mongoose = require("mongoose");

// 1. The Schema (The Rules)
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 2. The Export (CRITICAL STEP)
// Without this line, server.js sees an empty file!
module.exports = mongoose.model("Contact", contactSchema);
