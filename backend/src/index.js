const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const newsRoutes = require('./routes/newsRoutes');

const app = express();

// Verify environment variables are loaded
console.log('Environment Variables:');
console.log('PORT:', process.env.PORT);
console.log(
  'NEWSDATA_API_KEY:',
  process.env.NEWSDATA_API_KEY ? 'Found' : 'Missing'
);

// Enable CORS
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/news', newsRoutes);

// Test route
app.get('/test', (req, res) => {
  res.json({
    message: 'Server is running!',
    env: {
      port: process.env.PORT,
      hasApiKey: !!process.env.NEWSDATA_API_KEY,
    },
  });
});

const PORT = process.env.PORT || 5000;

// Start server with error handling
const server = app
  .listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  })
  .on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Trying ${PORT + 1}...`);
      server.listen(PORT + 1);
    } else {
      console.error('Server error:', err);
    }
  });

// Handle process termination
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server terminated');
  });
});

process.on('SIGINT', () => {
  server.close(() => {
    console.log('Server terminated by user');
    process.exit(0);
  });
});
