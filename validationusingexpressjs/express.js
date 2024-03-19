const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5500;

// Define the directory where the HTML files are located
app.use(express.static(path.join(__dirname, 'FSWD')));

// Define routes for each HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '', 'newefm;lw.html'));
});

app.get('/forgot', (req, res) => {
  res.sendFile(path.join(__dirname, '', 'forgot.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '', 'signup.html'));
});

// Error handling middleware function
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
