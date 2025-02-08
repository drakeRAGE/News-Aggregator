const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const newsRoutes = require('./routes/newsRoutes');
const commentRoutes = require('./routes/commentRoutes');
const newsLikeRoutes = require('./routes/newsLikeRoutes');
const savedArticleRoutes = require('./routes/savedArticleRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/news', newsRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/news-likes', newsLikeRoutes);
app.use('/api/saved-articles', savedArticleRoutes);

// ❗ Ensure 404 middleware is placed BEFORE the error handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Not Found',
  });
});

// ❗ Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
