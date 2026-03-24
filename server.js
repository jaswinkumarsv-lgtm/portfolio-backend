 const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');



const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();


// ✅ Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});


// ✅ Connect MongoDB
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));

// ✅ Schema
const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

// ✅ Model
const Contact = mongoose.model("Contact", ContactSchema);

// ✅ Route
app.post("/contact", async (req, res) => {
    try {
        console.log("BODY:", req.body);

        const { name, email, message } = req.body;

        // 🔴 Validation
        if (!name || !email || !message) {
            return res.status(400).send("All fields required ❌");
        }

        const newMessage = new Contact({
            name,
            email,
            message
        });

        await newMessage.save();

        res.send("Message Saved Successfully ✅");

    } catch (error) {
        console.log("ERROR:", error);
        res.status(500).send("Error saving message ❌");
    }
});

// ✅ Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});