const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// Simple test route
app.get("/", (req, res) => {
  res.send("Backend server is running successfully!");
});

// Example endpoint for transcription
app.get("/your-endpoint", (req, res) => {
  res.json({ transcribedText: "Hello from backend!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
