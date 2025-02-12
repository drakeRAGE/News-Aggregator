const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  articleId: {
    type: String,
    required: true,
    index: true,
  },
  userId: {
    type: String,
    required: true,
    index: true, // Index for user-specific queries
  },
  userName: {
    type: String,
    required: true,
    trim: true, // To ensure no leading/trailing spaces
  },
  content: {
    type: String,
    required: true,
    maxLength: 1000,
    trim: true, // Remove unnecessary spaces
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      userId: String,
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  likeCount: {
    type: Number,
    default: 0,
  },
  deletedAt: { // Soft delete field
    type: Date,
    default: null,
  },
});

// Index for more efficient querying
CommentSchema.index({ articleId: 1, userId: 1 });

module.exports = mongoose.model('Comment', CommentSchema);
