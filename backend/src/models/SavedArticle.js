const mongoose = require('mongoose');

const SavedArticleSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true, // Index for user-based queries
  },
  articleId: {
    type: String,
    required: true,
    index: true, // Index for article-based queries
  },
  title: {
    type: String,
    trim: true, // Remove unnecessary spaces
  },
  description: {
    type: String,
    trim: true, // Remove unnecessary spaces
  },
  imageUrl: String,
  sourceUrl: String,
  sourceName: String,
  publishedAt: Date,
  savedAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: { // Soft delete field
    type: Date,
    default: null,
  },
});

// Compound index for unique saved articles per user
SavedArticleSchema.index({ userId: 1, articleId: 1 }, { unique: true });

module.exports = mongoose.model('SavedArticle', SavedArticleSchema);
