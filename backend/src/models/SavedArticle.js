const mongoose = require('mongoose');

const SavedArticleSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  articleId: {
    type: String,
    required: true,
  },
  title: String,
  description: String,
  imageUrl: String,
  sourceUrl: String,
  sourceName: String,
  publishedAt: Date,
  savedAt: {
    type: Date,
    default: Date.now,
  },
});

SavedArticleSchema.index({ userId: 1, articleId: 1 }, { unique: true });

module.exports = mongoose.model('SavedArticle', SavedArticleSchema);
