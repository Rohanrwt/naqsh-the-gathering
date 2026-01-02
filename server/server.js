require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import Model
const Contact = require("./models/Contact");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// POST Route
app.post("/api/Contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const newContact = new Contact({
      name,
      email,
      phone,
      message,
    });

    await newContact.save();

    res.status(201).json({ message: "Contact details saved successfully!" });
  } catch (error) {
    // This looks for errors and prints them to the terminal
    console.error("Error saving contact:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Test Route
app.get("/api/contact", async (req, res) => {
  try {
    const allContacts = await Contact.find();

    res.status(200).json(allContacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
