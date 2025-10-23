import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";

// **this line for OpenAI**
import { Configuration, OpenAIApi } from "openai";

const express = require('express');
const cors = require('cors');
const app = express();

// Use environment port or default 5000
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Root route to check server status
app.get('/', (req, res) => {
  res.send('Backend is running successfully!');
});

// Your main endpoint for frontend fetch
app.get('/api/voice-to-text', (req, res) => {
  res.json({ transcribedText: 'Hello from your backend!' });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
