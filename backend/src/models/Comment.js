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
  },
  userName: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
    maxLength: 1000,
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
});

module.exports = mongoose.model('Comment', CommentSchema);
