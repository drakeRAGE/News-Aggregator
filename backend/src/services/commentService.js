const Comment = require('../models/Comment');

class CommentService {
  async getComments(articleId) {
    try {
      return await Comment.find({ articleId }).sort({ createdAt: -1 }).lean();
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  }

  async addComment(commentData) {
    try {
      console.log('Adding comment:', commentData);
      const comment = new Comment({
        ...commentData,
        likeCount: 0,
        likes: [],
      });
      const savedComment = await comment.save();
      console.log('Comment saved:', savedComment);
      return savedComment;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  }

  async likeComment(commentId, userId) {
    try {
      const comment = await Comment.findById(commentId);
      if (!comment) {
        throw new Error('Comment not found');
      }

      const hasLiked = comment.likes.some((like) => like.userId === userId);

      if (hasLiked) {
        // Unlike
        comment.likes = comment.likes.filter((like) => like.userId !== userId);
        comment.likeCount = Math.max(0, comment.likeCount - 1);
      } else {
        // Like
        comment.likes.push({ userId, timestamp: new Date() });
        comment.likeCount = comment.likeCount + 1;
      }

      return await comment.save();
    } catch (error) {
      console.error('Error liking comment:', error);
      throw error;
    }
  }
}

module.exports = new CommentService();
