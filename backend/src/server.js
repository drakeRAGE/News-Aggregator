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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
