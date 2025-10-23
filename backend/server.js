const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running successfully!');
});

app.get('/your-endpoint', (req, res) => {
  res.json({ transcribedText: 'Hello from backend!' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
