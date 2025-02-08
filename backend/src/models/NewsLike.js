const mongoose = require('mongoose');

const NewsLikeSchema = new mongoose.Schema({
  articleId: {
    type: String,
    required: true,
    index: true,
  },
  userId: {
    type: String,
    required: true,
    index: true, // Index for user-based queries
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: { // Soft delete field
    type: Date,
    default: null,
  },
});

// Compound index for unique likes per user per article
NewsLikeSchema.index({ articleId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('NewsLike', NewsLikeSchema);
